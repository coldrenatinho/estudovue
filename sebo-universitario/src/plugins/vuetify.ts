/**
 * plugins/vuetify.ts
 *
 * Tema visual personalizado do Sebo Universitário.
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'seboTheme',
    themes: {
      seboTheme: {
        dark: false,
        colors: {
          background: '#FFF8E1',
          surface: '#FFFFFF',
          primary: '#6D4C41',
          secondary: '#A1887F',
          accent: '#D84315',
          error: '#B00020',
          info: '#1976D2',
          success: '#2E7D32',
          warning: '#F9A825',
        },
      },
    },
  },
})
