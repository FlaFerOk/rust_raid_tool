<template>
  <div v-if="optimalExplosives.length > 0" class="calculation-result card">
    <h3>Optimal Explosive Combination</h3>
    
    <div class="explosives-list">
      <div
        v-for="explosive in optimalExplosives"
        :key="explosive.weaponId"
        class="explosive-item"
      >
        <div class="explosive-info">
          <span class="explosive-name">{{ explosive.weaponName }}</span>
          <span class="explosive-quantity">x{{ explosive.quantity }}</span>
        </div>
        <span class="explosive-sulfur">
          <SulfurIcon class="sulfur-icon-small" /> {{ explosive.sulfurCost }} sulfur
        </span>
      </div>
    </div>
    
    <div class="total-sulfur">
      <strong>Total Sulfur:</strong>
      <div class="total-sulfur-value">
        <SulfurIcon />
        <span>{{ totalSulfur }}</span>
      </div>
    </div>
    
    <button @click="handleAddToPlan" class="btn btn-success" type="button">
      Add to Raid Plan
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { OptimalExplosive } from '@/types';
import SulfurIcon from './icons/SulfurIcon.vue';

export default defineComponent({
  name: 'CalculationResult',
  
  components: {
    SulfurIcon,
  },
  
  props: {
    optimalExplosives: {
      type: Array as PropType<OptimalExplosive[]>,
      required: true,
    },
  },
  
  emits: ['add-to-plan'],
  
  computed: {
    totalSulfur(): number {
      return this.optimalExplosives.reduce((sum, exp) => sum + exp.sulfurCost, 0);
    },
  },
  
  methods: {
    handleAddToPlan() {
      this.$emit('add-to-plan');
    },
  },
});
</script>

<style scoped>
.calculation-result {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calculation-result h3 {
  color: var(--button-success);
  margin: 0;
}

.explosives-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.explosive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

.explosive-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.explosive-name {
  font-weight: 500;
  color: var(--header-primary);
}

.explosive-quantity {
  font-weight: 600;
  color: var(--button-primary);
  font-size: 16px;
}

.explosive-sulfur {
  color: #fbbf24; /* Amber-400 */
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.sulfur-icon-small) {
  width: 16px;
  height: 16px;
}

.total-sulfur {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-modifier-selected);
  border-radius: var(--radius-sm);
  font-size: 16px;
}

.total-sulfur strong {
  color: var(--header-primary);
}

.total-sulfur-value {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fbbf24; /* Amber-400 */
}

.total-sulfur-value span {
  font-weight: 600;
}
</style>
