<template>
  <div :class="ContainerStyle">
    <div class="columns-7xl shrink">{{ storeName }} Accounts</div>
    <div :class="AccountNumberStyle">FIXED {{ account.FIXED }}</div>
    <div :class="AccountNumberStyle">VARIABLE {{ account.VARIABLE }}</div>
    <div :class="AccountNumberStyle">HOLD {{ account.HOLD }}</div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { STORE_ACCOUNTS } from '@/utils/uta.constants'

const { name } = useRoute()

const storeName = ref(String(name).toUpperCase())

const account = computed(() => {
  return STORE_ACCOUNTS[storeName.value]
})

const ContainerStyle = ref(`
  flex
  font-semibold
  border-1
  border-slate-300
  rounded-2xl
  text-slate-400
  text-shadow-[1px]
  bg-slate-100
  shadow-xs
  shadow-slate-100
  p-1
  ps-4
  items-center
`)

const AccountNumberStyle = ref(`
  columns-1
  text-center
  p-4
`)
</script>
