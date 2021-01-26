import { useLocalStorage } from '@vueuse/core'
import { addMonths, format, max } from 'date-fns'
import { onMounted, toRefs } from 'vue'

const INPUT_FORMAT = 'yyyy-MM-dd'

export const useBusinessDay = () => {
  const store = useLocalStorage('bizbiz-business-day', {
    minDate: format(new Date(), INPUT_FORMAT),
    maxDate: format(addMonths(new Date(), 1), INPUT_FORMAT),
    resources: 1,
    productivity: 1,
    offDays: 1
  })

  onMounted(() => {
    store.value.minDate = format(
      max([new Date(store.value.minDate), new Date()]),
      INPUT_FORMAT
    )
  })

  return {
    ...toRefs(store.value)
  }
}
