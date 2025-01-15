import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'assets',
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'game',
			fileName: 'game',
			formats: ['cjs'],
		}
	}
})

