<template>
  <div class="business-day">
    <section class="result">
      <result-productivity
        :business-days="businessDays"
        :total-tickets="totalTickets"
      />
    </section>
    <form @submit.prevent class="columns is-multiline">
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
    <section class="result">
      <result-productivity
        :business-days="businessDays"
        :total-tickets="totalTickets"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useBusinessDay } from './useBusinessDay.hook'
import { businessDayService } from '@/services/businessDay.service'
import { useI18n } from 'vue-i18n'
import ResultProductivity from './ResultProductivity.vue'

export default defineComponent({
  components: { ResultProductivity },
  name: 'BusinessDay',
  setup() {
    const { t } = useI18n()
    const {
      minDate,
      maxDate,
      resources,
      productivity,
      offDays
    } = useBusinessDay()

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
.business-day {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
}

input {
  width: 200px;
}

.result {
  margin-top: 2rem;
  font-size: 40px;
}
</style>
