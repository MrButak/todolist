import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    // To use SCSS preprosser with a Vite/Vue
	css: {
		preprocessorOptions: {
			scss: {quietDeps: true},
		}
	},
});
