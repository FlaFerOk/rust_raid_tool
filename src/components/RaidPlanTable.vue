<template>
  <div class="raid-plan-table">
    <table v-if="items.length > 0">
      <thead>
        <tr>
          <th>Target</th>
          <th>HP</th>
          <th>Explosives Needed</th>
          <th>Sulfur Cost</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>
            <div class="target-cell">
              <img :src="`/images/${item.target.image}`" :alt="item.target.name" class="target-icon-small" />
              <span>{{ item.target.name }}</span>
            </div>
          </td>
          <td>
            <div class="hp-cell">
              <HeartIcon />
              <span>{{ item.customHP }}</span>
            </div>
          </td>
          <td>
            <div class="explosives-cell">
              <div
                v-for="explosive in item.optimalExplosives"
                :key="explosive.weaponId"
                class="explosive-line"
              >
                {{ explosive.quantity }}x {{ explosive.weaponName }}
              </div>
            </div>
          </td>
          <td>
            <div class="sulfur-cell">
              <SulfurIcon />
              <span>{{ formatNumber(item.totalSulfur) }}</span>
            </div>
          </td>
          <td>
            <button
              @click="handleDelete(item.id)"
              class="btn btn-danger btn-sm"
              type="button"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
      <div v-else class="empty-state">
      <p>No raid plans yet. Add some from the calculator!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { RaidPlanItem } from '@/types';
import SulfurIcon from './icons/SulfurIcon.vue';
import HeartIcon from './icons/HeartIcon.vue';

export default defineComponent({
  name: 'RaidPlanTable',
  
  components: {
    SulfurIcon,
    HeartIcon,
  },
  
  props: {
    items: {
      type: Array as PropType<RaidPlanItem[]>,
      required: true,
    },
  },
  
  emits: ['delete'],
  
  methods: {
    handleDelete(itemId: string) {
      this.$emit('delete', itemId);
    },
    formatNumber(num: number): string {
      return num.toLocaleString();
    }
  },
});
</script>

<style scoped>
.raid-plan-table {
  width: 100%;
}

.target-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.target-icon-small {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.explosives-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.explosive-line {
  font-size: 13px;
  color: var(--text-normal);
}

.sulfur-cell, .hp-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.sulfur-cell {
  color: #fbbf24; /* Amber-400 */
}

.hp-cell {
  color: #ef4444; /* Red-500 */
}

.hp-text {
  /* Legacy class kept just in case, but overridden by hp-cell context usually */
  color: inherit;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.empty-state p {
  font-size: 16px;
}
</style>
