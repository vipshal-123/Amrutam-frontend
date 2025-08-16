import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'copy-index-to-404',
            closeBundle() {
                copyFileSync('dist/index.html', 'dist/404.html')
            },
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
    },
})
