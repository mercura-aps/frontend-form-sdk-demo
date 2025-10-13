import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig((configEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd(), "");

    const CONFIG_PANEL = {
        target: env.VITE_TARGET,
        changeOrigin: true,
        ws: true,
        secure: true,
        headers: {
            cookie:
                (env.VITE_TARGET?.includes("staging")
                    ? "config_staging_session="
                    : "config_session=") + env.VITE_COOKIE,
        },
    };

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            proxy: {
                "/api": CONFIG_PANEL,
                "/storage/uploads": CONFIG_PANEL,
                "/dashboard": CONFIG_PANEL,
                "/packages": CONFIG_PANEL,
            },
        },
    };
});
