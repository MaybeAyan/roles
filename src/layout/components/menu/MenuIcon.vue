<template>
<menu-unfold-outlined v-if="collapsed" class="trigger" @click="props.collapsedChange" />
<menu-fold-outlined v-else class="trigger" @click="props.collapsedChange" />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

type Props = {
  collapsed:boolean
  collapsedChange:()=>void
}

const props = defineProps<Props>()

const { collapsed } = toRefs(props) 
</script>

<style scoped>

</style>
