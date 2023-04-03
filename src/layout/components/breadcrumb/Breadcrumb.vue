<template>
  <div class="flex justify-center items-center ">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route,routes: routesMatched,paths }">
        <span v-if="!hasRedirect(routesMatched,route)">
          {{ route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route,paths,$event)">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
    <span class="text-sm text-gray-400">&nbsp; / &nbsp; {{currentRoute.meta.title}}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref,watchEffect } from 'vue'
import type { RouteLocationMatched } from 'vue-router'
import { useRouter } from 'vue-router'
import { useGo } from '@/hooks/route/useGo'
import {isString} from '@/utils/is'
import {UseRouteNames} from '@/hooks/route/useRouteName'
import { getMenus } from '@/hooks/route/useRouteMenu'

const routeNames = new UseRouteNames()

const go = useGo()
const { currentRoute } = useRouter()

const routes = ref<RouteLocationMatched[]>([])

watchEffect(async () => {
	if (currentRoute.value.name === 'Redirect') return
	const menus = await getMenus()

	const key = currentRoute.value.matched[currentRoute.value.matched.length - 1]
		?.name as string
	const parent = routeNames.getCurParent(key)
	const filterMenus = menus.filter((item) => item.name === parent)
	const matched = getMatched(filterMenus, parent)

	if (!matched || matched.length === 0) return

	routes.value = matched
})

const getMatched = (menus:any[],parent:string) =>{
	const metched:any[] = []
	menus.forEach(item=>{
		if(item.name===parent){
			metched.push({
				...item,
				name:item.name
			})
		}
	})
	return metched
}

const hasRedirect=(routes: RouteLocationMatched[], route: RouteLocationMatched) => {
	return routes.indexOf(route) !== routes.length - 1
}


const handleClick = (route: RouteLocationMatched, paths: string[], e: Event) =>{
	e?.preventDefault()
	const { children, redirect, meta } = route

	if (children?.length && !redirect) {
		e?.stopPropagation()
		return
	}
	if (meta?.carryParam) {
		return
	}

	if (redirect && isString(redirect)) {
		go(redirect)
	} else {
		let goPath = ''
		if (paths.length === 1) {
			goPath = paths[0]
		} else {
			const ps = paths.slice(1)
			const lastPath = ps.pop() || ''
			goPath = `${lastPath}`
		}
		goPath = /^\//.test(goPath) ? goPath : `/${goPath}`
		go(goPath)
	}

}
</script>

<style lang="less">

.ant-breadcrumb {
  margin: 0 5px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.65);
}

</style>
