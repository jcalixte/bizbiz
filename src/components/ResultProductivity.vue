<template>
  <div class="result-productivity">
    {{ t('businessdays', businessDays, { named: { days: businessDays } }) }},
    {{
      t('total-tickets', totalTickets, {
        named: { totalTickets: totalTickets }
      })
    }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ResultProductivity',
  props: {
    businessDays: {
      type: Number,
      required: true
    },
    totalTickets: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()

    return {
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.result-productivity {
}
</style>
