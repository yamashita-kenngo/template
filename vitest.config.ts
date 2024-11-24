import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		include: ["./client/src/**/*.test.{ts,tsx}"],
		globals: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./client/src"),
		},
	},
});
