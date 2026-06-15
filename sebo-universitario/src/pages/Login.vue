<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { entrarComGoogleFirebase, firebaseConfigurado } from '@/services/firebase'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  function voltarDepoisDoLogin () {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirect)
  }

  async function entrarComFirebase () {
    auth.erro = null
    auth.carregando = true

    try {
      const idToken = await entrarComGoogleFirebase()
      await auth.loginComFirebase(idToken)
      voltarDepoisDoLogin()
    } catch (error) {
      auth.erro = error instanceof Error ? error.message : 'Não foi possível entrar com Firebase.'
    } finally {
      auth.carregando = false
    }
  }

  async function entrarDemo () {
    await auth.loginDemo()
    voltarDepoisDoLogin()
  }
</script>

<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" lg="5" md="6">
        <v-card class="pa-6" elevation="6">
          <v-card-title class="text-h4 font-weight-bold">Entrar no Sebo</v-card-title>
          <v-card-subtitle>Use Firebase Authentication com provedor Google.</v-card-subtitle>

          <v-card-text>
            <v-alert v-if="!firebaseConfigurado" class="mb-4" type="warning" variant="tonal">
              Firebase ainda não foi configurado. Preencha as variáveis VITE_FIREBASE_* no arquivo .env.
              Enquanto isso, use o modo demonstração para testar o CRUD.
            </v-alert>

            <v-alert v-if="auth.erro" class="mb-4" type="error" variant="tonal">
              {{ auth.erro }}
            </v-alert>

            <v-btn
              block
              color="accent"
              :disabled="!firebaseConfigurado"
              :loading="auth.carregando"
              prepend-icon="mdi-google"
              size="large"
              @click="entrarComFirebase"
            >
              Entrar com Google via Firebase
            </v-btn>

            <v-divider class="my-6">ou</v-divider>

            <v-btn
              block
              color="primary"
              :disabled="!auth.demoAtivo"
              :loading="auth.carregando"
              prepend-icon="mdi-account-school"
              size="large"
              @click="entrarDemo"
            >
              Entrar em modo demonstração
            </v-btn>

            <p class="text-caption text-medium-emphasis mt-4">
              O modo demonstração existe para o professor testar o projeto sem depender de credenciais Firebase.
              O login real usa Firebase Auth no frontend e valida o ID token com Firebase Admin no backend.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
