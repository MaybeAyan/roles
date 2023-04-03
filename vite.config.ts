import {defineConfig } from 'vite'
import viteBaseConfig from './config/vite.base.config'
import viteDevConfig from './config/vite.dev.config'
import viteProdConfig from './config/vite.prod.config'


const envResolver = {
	'build':()=>{
		console.log('生产环境')
		return {...viteBaseConfig,...viteProdConfig}
	},
	'serve':()=>{
		console.log('开发环境')
		return {...viteBaseConfig,...viteDevConfig}
	}
}

export default defineConfig(({command,mode})=>{
	console.log(mode)
	return envResolver[command]()
}) 

