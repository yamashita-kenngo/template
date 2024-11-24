import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

const __dirname = import.meta.dirname;
export default defineConfig({
	plugins: [
		react(),
		checker({ typescript: true, overlay: false }),
		runtimeErrorOverlay(),
		themePlugin(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "client", "src"),
			"@db": path.resolve(__dirname, "db"),
		},
	},
	root: path.resolve(__dirname, "client"),
	build: {
		outDir: path.resolve(__dirname, "dist/public"),
		emptyOutDir: true,
	},
});
