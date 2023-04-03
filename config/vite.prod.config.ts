import { defineConfig } from 'vite'
import configCompressPlugin from './plugin/compress'

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// 分包缓存 把不会常规更新的文件 单独打包
					// console.log(id)
					// if(id.includes('node_modules')){
					// 	return 'vendor'
					// }
				},
			},
		},
	},
	// plugins:[configCompressPlugin('gzip'),],
})
