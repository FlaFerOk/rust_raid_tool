<template>
  <div class="summary-card card">
    <h3>{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SummaryCard',
  
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.summary-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-card h3 {
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}
</style>
