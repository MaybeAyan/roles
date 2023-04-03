import type { Router } from 'vue-router'
import routeList from '../routes'
import { routes } from '@/router/index'
import { useUserStore } from '@/store'
import { flattenTree } from '@/utils/arrayHandler'
import { toRaw } from 'vue'
import { setRouteEmitter } from '@/utils/route-listener'


function setupPageGuard(router: Router) {
	router.beforeEach(async (to) => {
		// 发布订阅监听路由变化
		setRouteEmitter(to)
	})
}


export function getWhiteList() {
	// 获取基础路由
	const whiteList: string[] = ['/']
	routes.forEach((item) => {
		whiteList.push(item.path)

		item.children?.forEach((ite) => {
			whiteList.push(ite.path)
		})
	})

	// 获取经过处理后存在仓库的白名单路由列表
	routeList.forEach((item) => {
		whiteList.push(item.path)
		item.children?.forEach((ite) => {
			whiteList.push(ite.path)
		})
	})

	return [...new Set(whiteList)]
}

export function setupPermissionGuard(route: Router) {
	const whiteList = getWhiteList()

	route.beforeEach(async (to, from, next) => {
		const store = useUserStore()
		const menus = flattenTree(toRaw(store.menus)).map((ite) => ite.url)

		if (whiteList.includes(to.path) || localStorage.getItem('token')) {
			next()
		} else if(to.path.includes('redirect')){
			next()
		} else {
			// 不做跳转或者跳转指定页
			console.error('没有权限')
		}

	})
}

export function createRouteGuard(router: Router) {
	setupPageGuard(router)
	setupPermissionGuard(router)
}
