import { computed, ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useCashSalesDataStore } from './cashSalesData'
import { useCustomerDepositDataStore } from './customerDepositData'

import { COLUMN, getMerchantType, MERCHANTS } from '@/utils/uta.constants'
import { convertDate, cleanString } from '@/utils/excel.functions'

export const useUTAStore = defineStore('datauta', () => {
  const dataUTA: Ref<Array<string>> = ref([])
  const currentStore = ref('BMWT')

  const cashDataStore = useCashSalesDataStore()
  const { getControlValue } = cashDataStore
  const { hasCashSalesData } = storeToRefs(cashDataStore)

  const customerDepositStore = useCustomerDepositDataStore()
  const { hasCustomerDepositData } = storeToRefs(customerDepositStore)



  const loadUTA = (data: Array<string>) => {
    dataUTA.value = data
  }

  const hasDataUTA = computed(() => {
    return dataUTA.value.length > 0 ? true : false
  })

  const deniedCount = computed(() => {
    const count = Number(dataUTA.value?.filter((row) => row[COLUMN.RESPONSE] === 'DENIED').length)
    return count === undefined ? 0 : count
  })

  const hasAllData = computed(() => {
    return (hasDataUTA.value && hasCashSalesData.value && hasCustomerDepositData.value)
  })

  const cleanRowsUTA = computed(() => {
    return dataUTA.value?.filter((row) => row[COLUMN.RESPONSE] != 'DENIED').map(row => {
      const date = convertDate(Number(row[COLUMN.DATE]))
      const merch = getMerchantType(String(row[COLUMN.MERCHANT]), currentStore.value)
      const utaAmt = Number(row[COLUMN.TOTAL_AMOUNT])
      const chk = Number(row[COLUMN.CHECK_NUMBER])
      const ref = `UTA${date}${merch.code}`
      const ctrl = cleanString(row[COLUMN.CONTROL])
      return { date, merch, utaAmt, chk, ref, ctrl }
    })
  })

  const getValidRowsUTA = computed(() => {
    const all_rows: Array<string|number>[] = []
    if(hasAllData.value){
      cleanRowsUTA.value?.forEach((row, index) => {
        if (index > 0) {
          const allCtrls = row.ctrl.split(' ')
          console.log(allCtrls)
          if (allCtrls.length > 0) {
            allCtrls.forEach((cont) => {
              const c = Number(cont)
              if (row.merch.code === MERCHANTS.FIXED.CODE) {
                const val = getControlValue(c)
                all_rows.push([row.ref, row.ref, row.merch.acct, Number(val), c, `CHK#${row.chk}`])
              } else {
                all_rows.push([row.ref, row.ref, row.merch.acct, Number(row.utaAmt), row.ctrl, `CHK#${row.chk}`])
              }
            })
          } else {
            all_rows.push([row.ref, row.ref, row.merch.acct, Number(row.utaAmt), row.ctrl, `CHK#${row.chk}`])
          }
        }
      })
      return all_rows
    }
    return all_rows
  })

  const clearUTA = () => {
    dataUTA.value = []
  }

  return { loadUTA, dataUTA, currentStore, deniedCount, hasDataUTA, cleanRowsUTA, getValidRowsUTA, clearUTA }
})
