<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
  const router = useRouter()

  const links = [
    { title: 'Home', to: { name: 'home' }, icon: 'mdi-home' },
    { title: 'Livros', to: { name: 'lista' }, icon: 'mdi-bookshelf' },
    { title: 'Cadastro', to: { name: 'cadastro' }, icon: 'mdi-plus-circle' },
    { title: 'Sobre', to: { name: 'sobre' }, icon: 'mdi-information' },
  ]

  function sair () {
    auth.logout()
    router.push({ name: 'login' })
  }

  onMounted(() => {
    auth.buscarPerfil()
  })
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="3">
      <v-app-bar-title class="font-weight-bold">
        <v-icon class="mr-2" icon="mdi-bookshelf" />
        Sebo Universitário
      </v-app-bar-title>

      <template #append>
        <div class="d-none d-md-flex ga-1 mr-4">
          <v-btn
            v-for="link in links"
            :key="link.title"
            :prepend-icon="link.icon"
            :to="link.to"
            variant="text"
          >
            {{ link.title }}
          </v-btn>
        </div>

        <v-btn v-if="!auth.estaAutenticado" color="accent" :to="{ name: 'login' }" variant="flat">
          Entrar
        </v-btn>

        <v-menu v-else>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text">
              <v-avatar class="mr-2" size="32">
                <v-img v-if="auth.user?.avatarUrl" alt="Avatar" :src="auth.user.avatarUrl" />
                <v-icon v-else icon="mdi-account-circle" />
              </v-avatar>
              {{ auth.user?.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item prepend-icon="mdi-email" :title="auth.user?.email" />
            <v-divider />
            <v-list-item prepend-icon="mdi-logout" title="Sair" @click="sair" />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation class="d-md-none" color="primary" grow>
      <v-btn v-for="link in links" :key="link.title" :to="link.to">
        <v-icon :icon="link.icon" />
        <span>{{ link.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
