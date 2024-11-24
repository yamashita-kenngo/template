import { Hono } from "hono";
import type { Context } from "hono";

export function registerRoutes(app: Hono) {
	// API routes group
	const api = new Hono().basePath("/api");
	app.route("/api", api);

	// Add your API routes here
	api.get("/health", (c: Context) => c.json({ status: "ok" }));
}
