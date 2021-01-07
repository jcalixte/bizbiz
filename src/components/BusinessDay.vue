<template>
  <div class="business-day">
    <form @submit.prevent class="columns">
      <div class="column">
        <div class="field">
          <label class="label">{{ t('number-of-resources') }}</label>
          <div class="control">
            <input
              class="input"
              type="number"
              min="1"
              v-model.number="resources"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">{{ t('total-off-days') }}</label>
          <div class="control">
            <input
              class="input"
              type="number"
              min="0"
              v-model.number="offDays"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">{{ t('start-day') }}</label>
          <div class="control">
            <input class="input" type="date" v-model="minDate" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">{{ t('end-day') }}</label>
          <div class="control">
            <input class="input" type="date" v-model="maxDate" />
          </div>
        </div>
      </div>
    </form>
    <section class="result">
      {{ t('businessdays', businessDays, { named: { days: businessDays } }) }}
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { format } from 'date-fns'
import { businessDayService } from '@/services/businessDay.service'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BusinessDay',
  setup() {
    const { t } = useI18n()
    const now = format(new Date(), 'yyyy-MM-dd')
    const minDate = ref(now)
    const maxDate = ref(now)
    const resources = ref(1)
    const offDays = ref(0)

    const businessDays = computed(() => {
      const daysBetween = businessDayService.count(
        resources.value,
        new Date(minDate.value),
        new Date(maxDate.value),
        offDays.value
      )
      return daysBetween
    })

    return {
      minDate,
      maxDate,
      resources,
      offDays,
      businessDays,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.business-day {
}
</style>
