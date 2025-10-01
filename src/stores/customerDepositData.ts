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

  const cleanRows = computed(() => {
    const arr: Array<number | string>[] = []
    customerDepositData.value?.forEach((row, index) => {
      if (row[0] != undefined && row[1] != undefined && index != 0) {
        arr.push([Number(row[0]), combineName(String(row[1]))])
      }
    })
    return arr
  })

  function getCustomerId(customerName: string) {
    if (customerDepositData.value) {
      return customerDepositData.value.filter((row) => combineName(String(row[1])) === combineName(customerName)).length > 0
        ? Number(customerDepositData.value.filter((row) => combineName(String(row[1])) === combineName(customerName))[0][1])
        : 0
    }
    return 0
  }

  const clearCustomerDepositData = () => {
    customerDepositData.value = null
  }

  function combineName(name: string) {
    const splitName = name.split(' ')
    return [splitName[0], splitName[splitName.length - 1]].join('')
  }

  return {
    loadCustomerDepositData,
    customerDepositData,
    hasCustomerDepositData,
    cleanRows,
    getCustomerId,
    clearCustomerDepositData,
  }
})
