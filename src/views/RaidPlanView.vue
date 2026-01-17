<template>
  <div class="raid-plan-view container">
    <h1>Raid Plan</h1>
    
    <div v-if="raidPlan.length > 0" class="raid-plan-content">
      <!-- Summary Section -->
      <div class="summary-section">
        <SummaryCard title="Total Resources Needed">
          <div class="summary-grid">
            <div class="summary-item">
              <h3>Total Explosives</h3>
              <div class="explosives-summary">
                <div
                  v-for="(data, weaponId) in totalExplosivesNeeded"
                  :key="weaponId"
                  class="explosive-total"
                >
                  <span class="explosive-name">{{ data.name }}</span>
                  <span class="explosive-qty">x{{ data.quantity }}</span>
                </div>
                <div v-if="Object.keys(totalExplosivesNeeded).length === 0" class="no-data">
                  No explosives yet
                </div>
              </div>
            </div>
            
            <div class="summary-item">
              <h3>Total Sulfur</h3>
              <div class="total-sulfur-display">
                <SulfurIcon /> 
                <span>{{ totalSulfurNeeded }} sulfur</span>
              </div>
            </div>
          </div>
        </SummaryCard>
      </div>
      
      <!-- Raid Plan Table -->
      <div class="table-section">
        <div class="table-header">
          <h2>Raid Plan Items</h2>
          <button @click="confirmClearAll" class="btn btn-danger" type="button">
            Clear All
          </button>
        </div>
        
        <RaidPlanTable
          :items="raidPlan"
          @delete="removeFromRaidPlan"
        />
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="empty-state">
      <h2>No Raid Plans Yet</h2>
      <p>Start by adding targets from the calculator page.</p>
      <router-link to="/" class="btn btn-primary">Go to Calculator</router-link>
    </div>
    
    <!-- Confirm Dialog -->
    <ConfirmDialog
      :is-open="showConfirmDialog"
      title="Clear All Raid Plans"
      confirm-text="Clear All"
      cancel-text="Cancel"
      @confirm="handleClearAll"
      @cancel="showConfirmDialog = false"
    >
      Are you sure you want to clear all raid plans? This action cannot be undone.
    </ConfirmDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions, mapGetters } from 'pinia';
import { useRaidStore } from '@/stores/raidStore';
import RaidPlanTable from '@/components/RaidPlanTable.vue';
import SummaryCard from '@/components/SummaryCard.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import SulfurIcon from '@/components/icons/SulfurIcon.vue';

export default defineComponent({
  name: 'RaidPlanView',
  
  components: {
    RaidPlanTable,
    SummaryCard,
    ConfirmDialog,
    SulfurIcon,
  },
  
  data() {
    return {
      showConfirmDialog: false,
    };
  },
  
  computed: {
    ...mapState(useRaidStore, ['raidPlan']),
    ...mapGetters(useRaidStore, ['totalSulfurNeeded', 'totalExplosivesNeeded']),
  },
  
  methods: {
    ...mapActions(useRaidStore, ['removeFromRaidPlan', 'clearRaidPlan']),
    
    confirmClearAll() {
      this.showConfirmDialog = true;
    },
    
    handleClearAll() {
      this.clearRaidPlan();
      this.showConfirmDialog = false;
    },
  },
});
</script>

<style scoped>
.raid-plan-view {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
}

h1 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.raid-plan-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.summary-section {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.summary-item h3 {
  font-size: 14px;
  color: var(--header-secondary);
  margin-bottom: var(--spacing-md);
}

.explosives-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.explosive-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

.explosive-name {
  color: var(--text-normal);
}

.explosive-qty {
  font-weight: 600;
  color: var(--button-primary);
}

.total-sulfur-display {
  font-size: 24px;
  font-weight: 600;
  color: #fbbf24; /* Amber-400 */
  padding: var(--spacing-md);
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.table-section {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.table-header h2 {
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.empty-state h2 {
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.no-data {
  color: var(--text-muted);
  font-size: 14px;
  text-align: center;
  padding: var(--spacing-md);
}
</style>
