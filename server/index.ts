import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "@hono/node-server/serve-static";
import { registerRoutes } from "./routes";
import fs from "node:fs/promises";
import path from "node:path";

function formatTime() {
	return new Date().toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});
}

const app = new Hono();

// Logger middleware
app.use("*", logger((message: string) => {
	if (message.includes("/api")) {
		console.log(`${formatTime()} [hono] ${message}`);
	}
}));

// JSON body parser middleware
app.use("*", async (c: any, next: any) => {
	if (c.req.header("content-type")?.includes("application/json")) {
		const body = await c.req.json();
		c.set("requestBody", body);
	}
	await next();
});

// Error handling middleware
app.onError((err: any, c: any) => {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";
	return c.json({ message }, status);
});

// Register API routes
registerRoutes(app);

// Serve static files
if (process.env.NODE_ENV === "production") {
	app.use("/*", serveStatic({ root: "./dist/public" }));
} else {
	// In development, proxy requests to Vite dev server
	app.use("*", async (c, next) => {
		if (c.req.path.startsWith("/api")) {
			return next();
		}

		try {
			const viteDevServerUrl = "http://localhost:3000";
			const url = new URL(c.req.path, viteDevServerUrl);

			let body: BodyInit | undefined;
			if (c.req.method !== "GET" && c.req.method !== "HEAD") {
				const arrayBuffer = await c.req.raw.arrayBuffer();
				body = arrayBuffer;
			}

			const response = await fetch(url.toString(), {
				method: c.req.method,
				headers: c.req.header(),
				body,
			});

			return new Response(response.body, {
				status: response.status,
				headers: response.headers,
			});
		} catch (error) {
			console.error("Error proxying to Vite dev server:", error);
			return c.text("Internal Server Error", 500);
		}
	});
}

// Start server
const PORT = process.env.PORT || 5000;
serve({
	fetch: app.fetch,
	port: Number(PORT),
}, (info) => {
	console.log(`${formatTime()} [hono] serving on port ${info.port}`);
});
