import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCustomerDepositDataStore = defineStore('customerDepositData', () => {
  const customerDepositData: Ref<Array<string> | null> = ref(null)

  const loadCustomerDepositData = (data: Array<string>) => {
    customerDepositData.value = data
  }

  const hasCustomerDepositData = computed(() => {
    return customerDepositData.value === null ? false : true
  })

  const clearCustomerDepositData = () => {
    customerDepositData.value = null
  }

  return { loadCustomerDepositData, hasCustomerDepositData, clearCustomerDepositData }
})
