import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '@/views/CalculatorView.vue'
import RaidPlanView from '@/views/RaidPlanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calculator',
      component: CalculatorView,
    },
    {
      path: '/raid-plan',
      name: 'raidPlan',
      component: RaidPlanView,
    },
  ],
})

export default router
