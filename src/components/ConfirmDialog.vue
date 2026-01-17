<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal" @click.stop>
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="handleCancel" class="btn btn-secondary" type="button">
          {{ cancelText }}
        </button>
        <button @click="handleConfirm" class="btn btn-danger" type="button">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmDialog',
  
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Confirm Action',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  
  emits: ['confirm', 'cancel'],
  
  methods: {
    handleConfirm() {
      this.$emit('confirm');
    },
    
    handleCancel() {
      this.$emit('cancel');
    },
    
    handleOverlayClick() {
      this.$emit('cancel');
    },
  },
});
</script>

<style scoped>
.modal-body {
  color: var(--text-normal);
  line-height: 1.5;
}
</style>
