import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCashSalesDataStore = defineStore('cashSalesData', () => {
  const cashSalesData: Ref<Array<string> | null> = ref(null)

  const loadCashSalesData = (data: Array<string>) => {
    cashSalesData.value = data
  }

  const hasCashSalesData = computed(() => {
    return cashSalesData.value === null ? false : true
  })

  function getControlValue(controlNumber: number) {
    if (cashSalesData.value) {
      return cashSalesData.value.filter((row) => Number(row[0]) === controlNumber).length > 0
        ? cashSalesData.value.filter((row) => Number(row[0]) === controlNumber)[0][1]
        : false
    }
    return false
  }

  const clearCashSalesData = () => {
    cashSalesData.value = null
  }

  return { loadCashSalesData, cashSalesData, hasCashSalesData, getControlValue, clearCashSalesData }
})
