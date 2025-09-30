<template>
  <div v-if="!hasData">
    <input :id="id" type="file" accept=".xlsx, .xls" @change="handleUpload" class="hidden" />
    <label :for="id" :class="[ButtonStyle, MissingDataStyle]">Upload {{ idString }}</label>
  </div>
  <div v-else>
    <label :for="id" @click="handleClear" :class="[ButtonStyle, LoadedDataStyle]"
      >Clear {{ idString }}</label
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import { read, utils } from 'xlsx'

const props = defineProps<{
  id: string
}>()

const hasData = ref(false)

const ButtonStyle = ref(`
text-center
uppercase
font-semibold
cursor-pointer
block
p-2
rounded-xl
bg-slate-100
hover:bg-slate-50
`)

const MissingDataStyle = ref(`
border-1
border-slate-300
bg-slate-100
`)

const LoadedDataStyle = ref(`
border-1
border-emerald-300
bg-emerald-100
`)

const idString = computed(() => {
  return props.id.replace(/-/g, ' ')
})

const emit = defineEmits(['fileData', 'clearData'])

const handleUpload = (event: Event) => {
  const file = event.target?.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const workbook = read(e.target?.result)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 })
    emit('fileData', jsonData)
    hasData.value = true
  }
  reader.readAsArrayBuffer(file)
}

const handleClear = () => {
  emit('clearData')
  hasData.value = false
}
</script>
