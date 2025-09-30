<template>
  <div class="flex justify-evenly m-3">
    <UploadButton
      v-for="key in Object.keys(uploadButtons)"
      :key="`upload-${key}-btn`"
      :id="key"
      @fileData="uploadButtons[key].handler"
      @clearData="uploadButtons[key].clearHandler"
      :disabled="uploadButtons[key].disabled"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'

import { useUTAStore } from '@/stores/utaData'
import { useCashSalesDataStore } from '@/stores/cashSalesData'
import { useCustomerDepositDataStore } from '@/stores/customerDepositData'

import UploadButton from './UploadButton.vue'

interface UploadButton {
  [name: string]: {
    handler: (data: Array<string>) => void
    clearHandler: () => void
    disabled: boolean
  }
}

const utaStore = useUTAStore()
const { loadUTA, clearUTA } = utaStore

const cashSalesStore = useCashSalesDataStore()
const { loadCashSalesData, clearCashSalesData } = cashSalesStore

const customerDepositDataStore = useCustomerDepositDataStore()
const { loadCustomerDepositData, clearCustomerDepositData } = customerDepositDataStore

const uploadButtons: Ref<UploadButton> = ref({
  'cash-sales': {
    handler: handleCashSalesData,
    clearHandler: clearCashSalesData,
    disabled: false,
  },
  'customer-deposits': {
    handler: handleCustomerDepositData,
    clearHandler: clearCustomerDepositData,
    disabled: true,
  },
  'uta-report': {
    handler: handleUTA,
    clearHandler: clearUTA,
    disabled: true,
  },
})

function handleUTA(data: Array<string>) {
  loadUTA(data)
}

function handleCashSalesData(data: Array<string>) {
  loadCashSalesData(data)
}

function handleCustomerDepositData(data: Array<string>) {
  loadCustomerDepositData(data)
}
</script>
