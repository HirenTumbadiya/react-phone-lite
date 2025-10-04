import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(process.cwd(), 'src/index.ts'),
			name: 'ReactPhoneLite',
			formats: ['es'],
			fileName: 'index'
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		},
		sourcemap: true,
		emptyOutDir: true
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	}
});


