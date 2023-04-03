<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" width="210px">
      <div class="logo">
        <!-- logo -->
        <p v-show="!collapsed">角色交易后台</p>
      </div>
      <MenuView />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-box">
          <div class="left">  
            <MenuIcon :collapsed="collapsed" :collapsedChange="handleCollapsedChange" />
            <Breadcrumb class="select" />
          </div>
          <div class="right">
            <redoButton />
            <fullScreenVue />
            <a-button type="text" class="flex items-center">
              <span class="text-lg">{{ username }}</span>
            </a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content >
        <MutilTabs />
        <PageLayout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Breadcrumb from './components/breadcrumb/Breadcrumb.vue'
import MenuView from './components/menu/Menu.vue'
import PageLayout from './page-layout.vue'
import MutilTabs from './components/tabs/index.vue'
import MenuIcon from './components/menu/MenuIcon.vue'
import fullScreenVue from '@/layout/components/fullScreen/index.vue'
import redoButton from '@/layout/components/redoBtn/index.vue'
import { useWatchWindow } from '@/hooks/web/useWatchWindow'

const collapsed = ref<boolean>(false)

const handleCollapsedChange = () =>{
	collapsed.value = !collapsed.value
}

const { foldMenu }  = useWatchWindow()

window.addEventListener('resize',()=>{
	foldMenu(()=>{collapsed.value = true},()=>{collapsed.value =false})
})


const username = ref('admin')
</script>

<style lang="less">

.layout {
  min-height: 100vh;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left:40px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  transition: all 0.5s;
  line-height: normal;
}

.header {
  background-color: #fff !important;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  height: 48px;
  display: flex;
  padding: 0;
  margin-left: -1px;
  line-height: 48px;
  color: black;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;

  .trigger {
    margin-left: 5px;
  }

  &-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;

      .select {
        margin-left: 10px;
      }
    }

    .right {
      margin-right: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
