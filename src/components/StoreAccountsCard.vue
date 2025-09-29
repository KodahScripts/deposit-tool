<template>
    <div class="flex justify-evenly font-semibold border-1 border-slate-300 rounded-2xl text-slate-500 bg-slate-100 shadow-xs shadow-slate-100">
        <div class="">{{ String(name).toUpperCase() }} Accounts</div>
        <div v-for="key in Object.keys(account)" :key="`${String(name)}-acct-${key}`" class="flex">{{ key }} - {{ account[key] }}</div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import { STORE_ACCOUNTS } from '@/utils/uta.constants';

const { name } = useRoute()

const storeName = ref(String(name).toUpperCase())

const account = computed(() => {
    return STORE_ACCOUNTS[storeName.value]
})
</script>