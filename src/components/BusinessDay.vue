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
          <label class="label">{{ t('productivity') }}</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model.number="productivity"
              min="0"
              step="0.1"
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
  </div>
  <section class="result">
    <result-productivity
      :business-days="businessDays"
      :total-tickets="totalTickets"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { addMonths, format } from 'date-fns'
import { businessDayService } from '@/services/businessDay.service'
import { useI18n } from 'vue-i18n'
import ResultProductivity from './ResultProductivity.vue'

const INPUT_FORMAT = 'yyyy-MM-dd'

export default defineComponent({
  components: { ResultProductivity },
  name: 'BusinessDay',
  setup() {
    const { t } = useI18n()
    const now = format(new Date(), INPUT_FORMAT)
    const inOneMonth = format(addMonths(new Date(), 1), INPUT_FORMAT)
    const minDate = ref(now)
    const maxDate = ref(inOneMonth)
    const resources = ref(1)
    const productivity = ref(1)
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

    const totalTickets = computed(() =>
      Math.trunc(productivity.value * businessDays.value)
    )

    return {
      minDate,
      maxDate,
      resources,
      productivity,
      offDays,
      businessDays,
      totalTickets,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
input {
  min-width: 100px;
}

.result {
  margin-top: 2rem;
  font-size: 40px;
}
</style>
