<template>
  <div class="fullscreen">
    <a-button @click="toggleFullScreen" type="text">
      <template #icon>
        <fullscreen-outlined v-if="isFullScreen" />
        <fullscreen-exit-outlined v-else />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'

const isFullScreen = ref(false)

const toggleFullScreen = () => {
	if (!isFullScreen.value) {
		document.documentElement.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
	isFullScreen.value = !isFullScreen.value
}

</script>

<style scoped lang="less">

.fullscreen{
  margin:0 5px;
}
</style>