<template>
  <div class="target-card card" :class="{ selected: isSelected }" @click="handleClick">
    <div class="target-card-header">
      <input
        type="radio"
        :checked="isSelected"
        :name="'target-radio'"
        @click.stop
        @change="handleRadioChange"
      />
      <img :src="`/images/${target.image}`" :alt="target.name" class="target-icon" />
    </div>
    <div class="target-card-body">
      <h3>{{ target.name }}</h3>
      <div class="target-info">
        <span class="hp-display">
          <HeartIcon class="heart-icon-small" /> {{ target.hp }} HP
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Target } from '@/types';
import HeartIcon from './icons/HeartIcon.vue';

export default defineComponent({
  name: 'TargetCard',
  
  components: {
    HeartIcon,
  },
  
  props: {
    target: {
      type: Object as PropType<Target>,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  
  emits: ['select'],
  
  methods: {
    handleClick() {
      this.$emit('select', this.target.id);
    },
    
    handleRadioChange() {
      this.$emit('select', this.target.id);
    },
  },
});
</script>

<style scoped>
.target-card {
  cursor: pointer;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.target-card.selected {
  background-color: var(--bg-modifier-selected);
  border-color: var(--button-primary);
}

.target-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.target-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.target-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.target-card h3 {
  font-size: 14px;
  margin: 0;
  color: var(--header-primary);
}

.target-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hp-display {
  font-size: 13px;
  color: #ef4444; /* Red-500 */
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.heart-icon-small) {
  width: 16px;
  height: 16px;
}
</style>
