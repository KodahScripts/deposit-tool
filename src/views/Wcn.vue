<template>
  <StoreAccountsCard />
  <UploadButtonGroup />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';

import StoreAccountsCard from '@/components/StoreAccountsCard.vue'
import UploadButtonGroup from '@/components/UploadButtonGroup.vue'
import { useUTAStore } from '@/stores/utaData';
import { onMounted } from 'vue';

const utaStore = useUTAStore()
const { currentStore } = storeToRefs(utaStore)

onMounted(() => {
  currentStore.value = 'WCN'
})
</script>
