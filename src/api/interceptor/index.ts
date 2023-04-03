import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

if (import.meta.env.ENV_BASE_URL) {
	axios.defaults.baseURL = import.meta.env.ENV_BASE_URL
}

// TODO: 接口缓存池

axios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = 123
		const csrfToken = 456
		config.headers.Authorization = `Bearer ${token}`
		config.headers['X-CSRF-TOKEN'] = csrfToken
		config.headers['Content-Type'] = 'application/json'

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	async (response: AxiosResponse) => {
		const res = response.data

		// 对状态进行管理
		if (res.code !== 0) {
			// Message.error({
			// 	content: res.msg || 'Error',
			// 	duration: 5 * 1000,
			// })
			// 报错信息统一处理
			// return Promise.reject(new Error(res.msg || 'Error'))
		}

		return res
	},
	(error) => {
		// Message.error({
		// 	content: error.msg || '服务端异常',
		// 	duration: 5 * 1000,
		// })
		// 报错信息处理
		console.log('拦截器报错', error)
		return Promise.reject(error)
	}
)
