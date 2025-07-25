import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { pt } from 'vuetify/locale'

export default createVuetify({
  components,
  directives,
  locale: {
    locale: 'pt',
    messages: { pt },
  },
})
