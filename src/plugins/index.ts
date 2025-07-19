import type { App } from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import pinia from '@/plugins/pinia'

export function registerPlugins(app: App) {
  app.use(pinia).use(vuetify).use(router)
}
