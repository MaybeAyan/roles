import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		Components({
			resolvers: [AntDesignVueResolver()],
		}),
	],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, '../src'),
			},
		],
	},
	css: {
		preprocessorOptions: {
			less: {
				globalVars: {}, //全局变量配置
			},
		},
		devSourcemap: true,
	},
	optimizeDeps: {
		exclude: [],
	},
	envPrefix: 'ENV_', //环境变量前缀
})
