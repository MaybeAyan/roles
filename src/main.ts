import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { piniaPlugin } from '@/store/plugin/Persistence'
import '@/api/interceptor'
import '@/assets/css/global.css'
import '@/assets/css/tailwind/index.css'
import { useIconInstall } from '../config/icon/index'

const app = createApp(App)
const store = createPinia()
useIconInstall(app)
app.use(store)
store.use(
	piniaPlugin({
		key: 'pinia',
	})
)
app.use(router)
app.mount('#app')
