<template>
  <div class="calculator-view container">
    <h1>Rust Raid Calculator</h1>
    
    <div class="calculator-grid">
      <!-- Weapons Selection -->
      <section class="section">
        <h2>Select Explosives</h2>
        <div class="grid grid-2">
          <WeaponCard
            v-for="weapon in weapons"
            :key="weapon.id"
            :weapon="weapon"
            :is-selected="selectedWeaponIds.includes(weapon.id)"
            @toggle="toggleWeapon"
          />
        </div>
      </section>
      
      <!-- Target Selection -->
      <section class="section">
        <h2>Select Target</h2>
        <div class="grid grid-3">
          <TargetCard
            v-for="target in targets"
            :key="target.id"
            :target="target"
            :is-selected="selectedTargetId === target.id"
            @select="selectTarget"
          />
        </div>
        
        <!-- HP Editor -->
        <div v-if="selectedTarget" class="hp-editor-container">
          <HPEditor
            :current-h-p="currentHP"
            :default-h-p="selectedTarget.hp"
            @update="setCustomHP"
          />
        </div>
      </section>
      
      <!-- Calculation Result -->
      <section v-if="optimalExplosives" class="section">
        <CalculationResult
          :optimal-explosives="optimalExplosives"
          @add-to-plan="addToRaidPlan"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions, mapGetters } from 'pinia';
import { useRaidStore } from '@/stores/raidStore';
import WeaponCard from '@/components/WeaponCard.vue';
import TargetCard from '@/components/TargetCard.vue';
import HPEditor from '@/components/HPEditor.vue';
import CalculationResult from '@/components/CalculationResult.vue';

export default defineComponent({
  name: 'CalculatorView',
  
  components: {
    WeaponCard,
    TargetCard,
    HPEditor,
    CalculationResult,
  },
  
  computed: {
    ...mapState(useRaidStore, ['weapons', 'targets', 'selectedWeaponIds', 'selectedTargetId']),
    ...mapGetters(useRaidStore, ['selectedTarget', 'currentHP']),
    
    optimalExplosives() {
      const store = useRaidStore();
      return store.calculateOptimalRaid();
    },
  },
  
  methods: {
    ...mapActions(useRaidStore, [
      'loadWeapons',
      'loadTargets',
      'toggleWeapon',
      'selectTarget',
      'setCustomHP',
      'addToRaidPlan',
    ]),
  },
  
  mounted() {
    this.loadWeapons();
    this.loadTargets();
  },
});
</script>

<style scoped>
.calculator-view {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
}

h1 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.calculator-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.hp-editor-container {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
}
</style>
