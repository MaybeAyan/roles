import { toRaw } from 'vue'
import { PiniaPluginContext } from 'pinia'

type Options = {
  key?: string;
};

const __piniaKey__ = 'pinia'

const setStorage = (key: string, value: any): void => {
	localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
	return localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key) as string)
		: {}
}

export const piniaPlugin = (options: Options) => {
	return (context: PiniaPluginContext) => {
		const { store } = context
		const data = getStorage(`${options.key ?? __piniaKey__}-${store.$id}`)

		store.$subscribe(() => {
			setStorage(
				`${options.key ?? __piniaKey__}-${store.$id}`,
				toRaw(store.$state)
			)
		})

		return {
			...data,
		}
	}
}
