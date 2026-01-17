<template>
  <div class="hp-editor">
    <label>
      <div class="label-row">
        <HeartIcon class="heart-icon-small" />
        <span class="label-text">Target HP:</span>
      </div>
      <div class="hp-input-group">
        <input
          type="number"
          :value="currentHP"
          @input="handleInput"
          min="1"
          placeholder="Enter HP"
        />
        <button
          v-if="isCustom"
          @click="resetToDefault"
          class="btn btn-secondary btn-sm"
          type="button"
        >
          Reset
        </button>
      </div>
    </label>
    <p v-if="defaultHP" class="default-hp-text">Default: {{ defaultHP }} HP</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeartIcon from './icons/HeartIcon.vue';

export default defineComponent({
  name: 'HPEditor',
  
  components: {
    HeartIcon,
  },
  
  props: {
    currentHP: {
      type: Number,
      required: true,
    },
    defaultHP: {
      type: Number,
      required: true,
    },
  },
  
  emits: ['update'],
  
  computed: {
    isCustom(): boolean {
      return this.currentHP !== this.defaultHP;
    },
  },
  
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      const value = parseInt(target.value, 10);
      
      if (!isNaN(value) && value > 0) {
        this.$emit('update', value);
      }
    },
    
    resetToDefault() {
      this.$emit('update', this.defaultHP);
    },
  },
});
</script>

<style scoped>
.hp-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #ef4444; /* Red-500 */
}

:deep(.heart-icon-small) {
  width: 16px;
  height: 16px;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--header-secondary);
}

.hp-input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.hp-input-group input {
  flex: 1;
}

.btn-sm {
  padding: 8px 12px;
  font-size: 13px;
}

.default-hp-text {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}
</style>
