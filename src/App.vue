<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <h1 class="navbar-title">🔥 Rust Raid Tool</h1>
        <div class="navbar-links">
          <router-link to="/" class="nav-link">Calculator</router-link>
          <router-link to="/raid-plan" class="nav-link">Raid Plan</router-link>
        </div>
      </div>
    </nav>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  padding: 16px 0;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--header-primary);
  margin: 0;
}

.navbar-links {
  display: flex;
  gap: var(--spacing-md);
}

.nav-link {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  color: var(--text-normal);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  background-color: var(--bg-modifier-hover);
  text-decoration: none;
}

.nav-link.router-link-active {
  background-color: var(--button-primary);
  color: white;
}

main {
  flex: 1;
}
</style>

