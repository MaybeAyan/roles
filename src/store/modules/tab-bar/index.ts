import type { RouteLocationNormalized,Router } from 'vue-router'
import { defineStore } from 'pinia'
import { Names } from '@/store/store-name'
import { TabBarState, TagProps } from './types'
import { unref } from 'vue'
import { useRedo } from '@/hooks/route/usePage'

const formatTag = (route: RouteLocationNormalized): TagProps => {
	const { name, meta, fullPath, query } = route
	return {
		title: (meta.title as string) || '',
		name: String(name),
		fullPath,
		query,
	}
}

const useAppStore = defineStore(Names.TAB_BAR, {
	state: (): TabBarState => ({
		cacheTabList: [],
		tagList: [
			// 根据需要设置第一个元素
			{title:'商品列表',name:'goodsList',fullPath:'/goods/list'}
		],
	}),

	getters: {
		getTabList(): TagProps[] {
			return this.tagList
		},
		getCacheList(): string[] {
			return Array.from(this.cacheTabList )
		},
	},

	actions: {
		updateTabList(route: RouteLocationNormalized) {
			if(formatTag(route).fullPath==='/') return
			this.tagList.push(formatTag(route))
			this.cacheTabList.push(route.name as string)
		},
		deleteTag(idx: number, tag: TagProps) {
			this.tagList.splice(idx, 1)
			// 缓存机制
			this.cacheTabList.splice(this.cacheTabList.indexOf(tag.name),1)
		},

		async refreshPage(router: Router) {
			const { currentRoute } = router
			const route = unref(currentRoute)
			const name = route.name

			const findTab = this.getCacheList.find((item) => item === name)
			if (findTab) {
				this.cacheTabList.splice(this.cacheTabList.indexOf(findTab),1)
			}
			const redo = useRedo(router)
			await redo()
		},
	},
})

export default useAppStore
