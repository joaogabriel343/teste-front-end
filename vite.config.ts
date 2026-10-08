import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const productsProxy = {
  '/api/produtos.json': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
}

export default defineConfig({
  plugins: [react()],
  server: { proxy: productsProxy },
  preview: { proxy: productsProxy },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
})
