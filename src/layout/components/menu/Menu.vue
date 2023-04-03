<template>
  <div>
    <a-menu mode="inline" :selected-keys="selectedKey" :openKeys="openKeys" theme="dark">
      <a-sub-menu v-for="item in menuTree" :key="item.name">
        <template #icon>
            <component :is="item.meta.icon" two-tone-color="#fff" />
        </template>
        <template #title>
          {{ item.meta?.title }}
        </template>
        <a-menu-item
          v-for="ite in item.children"
          :key="ite.name"
          @click="goto(ite)"
        >
          {{ ite.meta?.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { UseRouteNames } from '@/hooks/route/useRouteName'
import { useRouter,RouteRecordNormalized } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import { useUserStore,useTabBarStore } from '@/store/index'
import { listenerRouteChange } from '@/utils/route-listener'

// const store = useUserStore()
// const tabStore =useTabBarStore()
const router = useRouter()


// 前端表
const appRoute = computed(() => {
	return router
		.getRoutes()
		.find((el) => el.name === 'root') as RouteRecordNormalized
})

const menuTree = computed(() => {
	const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children))
	copyRouter.sort(
		(a: RouteRecordNormalized, b: RouteRecordNormalized) => {
			return (a.meta.order || 0) - (b.meta.order || 0)
		}
	)
	function travel(_routes: RouteRecordRaw[], layer: number) {
		if (!_routes) return null
		const collector: any = _routes.map((element) => {

			if (!element.children) {
				return element
			}

			// 通过meta筛选隐藏菜单
			element.children = element.children.filter(
				(x) => x.meta?.hideInMenu !== true
			)

			const subItem = travel(element.children, layer)
			if (subItem.length) {
				element.children = subItem
				return element
			}

			if (layer > 1) {
				element.children = subItem
				return element
			}

			if (element.meta?.hideInMenu === false) {
				return element
			}

			return null
		})
		return collector.filter(Boolean)
	}
	return travel(copyRouter, 0)
})


// 后端匹配后的表
// const getMenu = () => {
// 	const menu: RouteRecordRaw[] = []
// 	const initMenu = [...appRoutes]

// 	store.menus.forEach((item) => {
// 		initMenu.forEach((ite) => {
// 			if (item.name === ite.meta?.title) {
// 				menu.push(ite)
// 			}
// 		})
// 	})

// 	// 解决同名冲突
// 	menu.forEach((item, index) => {
// 		initMenu.forEach((el) => {
// 			if (el.name === item.meta?.title) {
// 				let deleteMenus: number[] = []

// 				item.children?.forEach((subItem, subIndex) => {
// 					const subMenu = el.children?.find(
// 						(subEl) => subEl.name === subItem.meta?.title
// 					)

// 					if (!subMenu) {
// 						deleteMenus.push(subIndex)
// 					}
// 				})

// 				menu[index].children = menu[index].children?.map((val, valIndex) => {
// 					if (!deleteMenus.includes(valIndex)) {
// 						return val
// 					}
// 				}) as any
// 			}
// 		})
// 	})

// 	return menu
// }

// const menu = reactive(getMenu())

const goto = (ite: RouteRecordRaw) => {
	router.push({
		name: ite.name,
	})
}

const selectedKey = ref<string[]>([])

const openKeys = ref<(string | undefined)[]>([undefined])

const useRouteName =  new UseRouteNames()


listenerRouteChange((newRoute) => {
	if (!newRoute.meta.hideMenu) {
		const key = newRoute.matched[newRoute.matched.length - 1]
			?.name as string
		selectedKey.value = [key]
		openKeys.value = [useRouteName.getCurParent(key)]
	}
}, true)
</script>

<style lang="less" scoped>
  :deep(.ant-menu) {
    background-color: rgb(0,21,41);
    color: #ffffffb3;
    .ant-menu-item-selected {
        background-color: rgb(9,96,189);
        color: #fff;
      }
  }

  :deep(.ant-menu-dark) .ant-menu-inline.ant-menu-sub{
  
    background-color: rgb(12,33,53);
  }


</style>
