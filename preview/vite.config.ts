import { createHash } from 'node:crypto'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Library CSS modules are all named styles.module.css, so use the
      // component directory for a readable class: ui-button-root_ab12
      generateScopedName(name, filename) {
        const component = path.basename(path.dirname(filename.split('?')[0]))
        const hash = createHash('md5')
          .update(`${filename}:${name}`)
          .digest('base64url')
          .slice(0, 4)
        return `ui-${component}-${name}_${hash}`
      },
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
  optimizeDeps: {
    exclude: ['ui'],
  },
})
