import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import postcssPresetEnv from 'postcss-preset-env'

/**
 * @description vite 配置项参考
 *
 */
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		Components({
			resolvers: [AntDesignVueResolver()], // 按需加载 antdesign
		}),
	],
	optimizeDeps: {
		exclude: [], // 将指定数组中的依赖不进行预构建
	},
	css: {
		modules: {}, // css 模块化处理
		preprocessorOptions: {
			less: {
				globalVars: {}, //全局变量配置
			},
		},
		devSourcemap: true, // css 报错提示
		postcss: {
			// plugins:[postcssPresetEnv()] // css 后处理器配置 自动补全 语法降级
		},
	},
	envPrefix: 'ENV_', // 配置vite 注入客户端环境变量校验的前缀
})
