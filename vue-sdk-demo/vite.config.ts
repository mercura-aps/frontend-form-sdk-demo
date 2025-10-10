import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), '')

  const CONFIG_PANEL = {
    target: env.VITE_TARGET,
    changeOrigin: true,
    ws: true,
    secure: true,
    headers:
      env.VITE_COOKIE !== ''
        ? {
            cookie:
              (env.VITE_TARGET?.includes('staging')
                ? 'config_staging_session='
                : 'config_session=') + env.VITE_COOKIE,
          }
        : {},
  }

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': CONFIG_PANEL,
        '/storage/uploads': CONFIG_PANEL,
        '/dashboard': CONFIG_PANEL,
        '/packages': CONFIG_PANEL,
      },
    },
  }
})
