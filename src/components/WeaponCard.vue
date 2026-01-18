<template>
  <div class="weapon-card card" :class="{ selected: isSelected }" @click="handleClick">
    <div class="weapon-card-header">
      <input
        type="checkbox"
        :checked="isSelected"
        @click.stop
        @change="handleCheckboxChange"
      />
      <img :src="`images/${weapon.image}`" :alt="weapon.name" class="weapon-icon" />
    </div>
    <div class="weapon-card-body">
      <h3>{{ weapon.name }}</h3>
      <div class="weapon-info">
        <span class="sulfur-cost">
          <SulfurIcon class="sulfur-icon-small" /> {{ weapon.sulfur_cost }} sulfur
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Weapon } from '@/types';
import SulfurIcon from './icons/SulfurIcon.vue';

export default defineComponent({
  name: 'WeaponCard',
  
  components: {
    SulfurIcon,
  },
  
  props: {
    weapon: {
      type: Object as PropType<Weapon>,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  
  emits: ['toggle'],
  
  methods: {
    handleClick() {
      this.$emit('toggle', this.weapon.id);
    },
    
    handleCheckboxChange(event: Event) {
      this.$emit('toggle', this.weapon.id);
    },
  },
});
</script>

<style scoped>
.weapon-card {
  cursor: pointer;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weapon-card.selected {
  background-color: var(--bg-modifier-selected);
  border-color: var(--button-primary);
}

.weapon-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weapon-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.weapon-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weapon-card h3 {
  font-size: 14px;
  margin: 0;
  color: var(--header-primary);
}

.weapon-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sulfur-cost {
  font-size: 13px;
  color: #fbbf24; /* Amber-400 */
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.sulfur-icon-small) {
  width: 16px;
  height: 16px;
}
</style>
