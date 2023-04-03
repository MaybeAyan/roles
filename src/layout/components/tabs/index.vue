<template>
<div>
  <Tabs type="editable-card" size="small" :hideAdd="true" :tabBarGutter="3" @edit="onEdit" @change="goto" :activeKey="activeKey">
    <a-tab-pane v-for="pane in panes" :key="pane.fullPath" :tab="pane.title" :closable="store.getTabList.length>1" />
  </Tabs>
</div>
</template>

<script setup lang="ts">
import { Tabs } from 'ant-design-vue'
import { computed } from 'vue'
import { useTabBarStore } from '@/store'
import type { TagProps } from '@/store/modules/tab-bar/types'
import { useRouter } from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
import { listenerRouteChange } from '@/utils/route-listener'
import { REDIRECT_NAME } from '@/enums/pageEnum' 


const store = useTabBarStore()
const router = useRouter()

const panes = computed(()=>{
	return store.getTabList
})


const activeKey = computed(()=>{
	return router.currentRoute.value.fullPath
})

const goto = (key:any)=>{
	router.push(key as string)
}

listenerRouteChange((route: RouteLocationNormalized) => {
	if (
		!route.meta.noAffix &&
    !panes.value.some((tag) => tag.fullPath === route.fullPath)&&
    route.meta.title !== REDIRECT_NAME
	) {
		store.updateTabList(route)
	}
}, true)

const tagClose = (tag: TagProps, idx: number) => {
	store.deleteTag(idx, tag)
	if (idx === panes.value.length) {
		const latest = panes.value[panes.value.length - 1]
		router.push({ name: latest.name })
	}
	if(idx < panes.value.length){
		const latest = panes.value[idx]
		router.push({name:latest.name})
	}
}


const onEdit = (e:any) =>{
	const tag = store.tagList.find(item=>item.fullPath===e)

	if(tag) {
		const idx = store.tagList.indexOf(tag)
		tagClose(tag,idx)
	}
}

</script>

<style scoped lang="less">
@import './index';
</style>
