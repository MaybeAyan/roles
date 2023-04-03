<template>
  <div class="container-wrap">
    <router-view v-slot="{ Component, route }">

      <transition
        name="fade" 
        mode="out-in" 
        appear
      >
        <div>
          <component
            :is="Component"
            v-if="route.meta.ignoreCache"
            :key="route.name"
          />
          <keep-alive v-else :include="cacheList">
            <transition
              @before-enter="EnterFrom"
              @enter="EnterActive"
              @after-enter="EnterTo"
              appear
            >
              <component :is="Component" :key="route.name" />
            </transition>
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTabBarStore } from '@/store'
import { UseAnimate } from '@/hooks/route/useAnimate'

const tabBarStore = useTabBarStore()
const cacheList = computed(() => tabBarStore.getCacheList)

const { EnterFrom,EnterActive,EnterTo } = UseAnimate()

</script>

<style scoped lang="less">
  .container-wrap {
    padding: 0 20px;
    background-color: var(--color-fill-2);
  }
</style>
