import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Charger le plugin uniquement en mode développement
let vueDevTools = []
if (process.env.NODE_ENV === 'development') {
  const devtools = await import('vite-plugin-vue-devtools')
  vueDevTools = [devtools.default()]
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...vueDevTools, // Devtools uniquement en local
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
