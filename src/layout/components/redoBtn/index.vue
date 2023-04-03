
<template>
  <div>
    <a-button type="text" @click="handleClick">
      <template #icon>
        <sync-outlined :spin="isLoading" />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { useTabBarStore } from '@/store'
import { useRouter } from 'vue-router'

const isLoading = ref(false) 
const { refreshPage } = useTabBarStore()
const router = useRouter()

const handleClick = async () =>{
	isLoading.value = true
	await refreshPage(router)
	setTimeout(() => {
		isLoading.value = false
	}, 1000)
}
</script>

<style scoped>

</style>