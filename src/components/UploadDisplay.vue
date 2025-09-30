<template>
<div v-for="row in getValidRowsUTA">{{ row }}</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUTAStore } from '../stores/utaData'
const store = useUTAStore()
const { getValidRowsUTA } = storeToRefs(store)
</script>