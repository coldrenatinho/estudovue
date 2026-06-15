/**
 * router/index.ts
 *
 * Rotas manuais da aplicação.
 */

import { createRouter, createWebHistory } from 'vue-router'

import Cadastro from '@/pages/Cadastro.vue'
import Home from '@/pages/Home.vue'
import Lista from '@/pages/Lista.vue'
import Login from '@/pages/Login.vue'
import Sobre from '@/pages/Sobre.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/lista', name: 'lista', component: Lista, meta: { requiresAuth: true } },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, meta: { requiresAuth: true } },
    { path: '/sobre', name: 'sobre', component: Sobre },
  ],
})

router.beforeEach(to => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.estaAutenticado) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.estaAutenticado) {
    return { name: 'home' }
  }
})

export default router
