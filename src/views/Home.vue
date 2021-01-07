<template>
  <div class="home">
    <BusinessDay />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BusinessDay from '@/components/BusinessDay.vue'

export default defineComponent({
  name: 'Home',
  components: {
    BusinessDay
  }
})
</script>
