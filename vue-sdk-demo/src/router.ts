import { createRouter, createWebHistory } from 'vue-router'
import Checkout from './pages/CheckoutComponent.vue'
import Config from './pages/ConfigComponent.vue'
import CreateConfigs from './pages/CreateConfigs.vue'
import Draft from './pages/DraftComponent.vue'
import RequestCopy from './pages/RequestCopy.vue'

const routes = [
  { path: '/', component: CreateConfigs },
  { path: '/config/:configId', component: Config },
  { path: '/checkout', component: Checkout },
  { path: '/draft/:draftId', component: Draft },
  { path: '/request-copy/:requestCopyId', component: RequestCopy },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
