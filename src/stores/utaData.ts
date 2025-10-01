import { computed, ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useCashSalesDataStore } from './cashSalesData'
import { useCustomerDepositDataStore } from './customerDepositData'

import { COLUMN, getMerchantType, type Upload } from '@/utils/uta.constants'
import { convertDate, cleanString } from '@/utils/excel.functions'

export const useUTAStore = defineStore('datauta', () => {
  const dataUTA: Ref<Array<string>> = ref([])
  const currentStore = ref('BMWT')

  const cashDataStore = useCashSalesDataStore()
  const { getControlValue } = cashDataStore
  const { hasCashSalesData } = storeToRefs(cashDataStore)

  const customerDepositStore = useCustomerDepositDataStore()
  const { getCustomerId } = customerDepositStore
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
    return hasDataUTA.value && hasCashSalesData.value && hasCustomerDepositData.value
  })

  const cleanRowsUTA = computed(() => {
    return dataUTA.value
      ?.filter((row) => row[COLUMN.RESPONSE] != 'DENIED')
      .map((row) => {
        const date = convertDate(Number(row[COLUMN.DATE]))
        const merch = getMerchantType(String(row[COLUMN.MERCHANT]), currentStore.value)
        const utaAmt = Number(row[COLUMN.TOTAL_AMOUNT])
        const chk = Number(row[COLUMN.CHECK_NUMBER])
        const refNum = `UTA${date}${merch.code}`
        const ctrl = cleanString(row[COLUMN.CONTROL])
        const name = row[COLUMN.NAME]
        return { date, merch, utaAmt, chk, refNum, ctrl, name }
      })
  })

  const analyzeData = computed(() => {
    const all_rows: Upload = {}
    if (hasAllData.value) {
      cleanRowsUTA.value?.forEach((row, index) => {
        if (index > 0) {
          all_rows[row.refNum] = []
          const ctrls = row.ctrl.split(' ')
          if(ctrls.length > 1) {
            ctrls.forEach(cont => {
              const amt = getControlValue(String(cont)) === undefined ? 0 : Number(getControlValue(String(cont)))
              all_rows[row.refNum].push({ ref: row.refNum, acct: row.merch.acct, amt, ctrl: cont, desc: `CHK#${row.chk}` })
            })
          } else {
            if(row.merch.code === 'V' || row.merch.code === 'H') {
              if(getCustomerId(row.name) > 0) {
                if(all_rows[row.refNum]) {
                  all_rows[row.refNum].push({ ref: row.refNum, acct: row.merch.acct, amt: row.utaAmt, ctrl: String(getCustomerId(row.name)), desc: `CHK#${row.chk}` })
                }
              } else {
                all_rows[row.refNum].push({ ref: row.refNum, acct: row.merch.acct, amt: row.utaAmt, ctrl: `---${row.ctrl}---`, desc: `CHK#${row.chk}` })
              }
            } else {
              all_rows[row.refNum].push({ ref: row.refNum, acct: row.merch.acct, amt: row.utaAmt, ctrl: row.ctrl, desc: `CHK#${row.chk}` })
            }
          }
        }
      })
    }
    return all_rows
  })

  function getUploadRows(refNum: string) {
    return analyzeData.value[refNum].filter(row => row.amt > 0 && row.ctrl.length < 7)
  }

  function getReviewRows(refNum: string) {
    return analyzeData.value[refNum].filter(row => row.amt === 0 || row.ctrl.length > 7)
  }

  const clearUTA = () => {
    dataUTA.value = []
  }

  return {
    loadUTA,
    dataUTA,
    currentStore,
    deniedCount,
    hasDataUTA,
    cleanRowsUTA,
    analyzeData,
    getUploadRows,
    getReviewRows,
    clearUTA,
  }
})