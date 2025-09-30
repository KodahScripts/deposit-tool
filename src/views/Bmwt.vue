<template>
  <StoreAccountsCard />
  <UploadButtonGroup />
  <UploadDisplay />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';

import StoreAccountsCard from '@/components/StoreAccountsCard.vue'
import UploadButtonGroup from '@/components/UploadButtonGroup.vue'
import UploadDisplay from '@/components/UploadDisplay.vue';

import { useUTAStore } from '@/stores/utaData';
import { onMounted } from 'vue';

const utaStore = useUTAStore()
const { currentStore } = storeToRefs(utaStore)

onMounted(() => {
  currentStore.value = 'BMWT'
})
</script>
