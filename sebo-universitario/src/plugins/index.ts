/**
 * plugins/index.ts
 *
 * Registra Vuetify, Pinia e Vue Router na aplicação.
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'

import router from '../router'
import vuetify from './vuetify'

const pinia = createPinia()

export function registerPlugins (app: App) {
  app.use(pinia)
  app.use(vuetify)
  app.use(router)
}
