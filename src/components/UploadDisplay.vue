<template>
  <div v-for="row in rows">{{ row }}</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useUTAStore } from '../stores/utaData'
const store = useUTAStore()
const { getUploadRows } = store

const props = defineProps<{
  refNum: string
}>()

const rows = computed(() => {
  return getUploadRows(props.refNum)
})
</script>
