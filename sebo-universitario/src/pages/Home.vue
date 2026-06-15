<script setup lang="ts">
  import { onMounted } from 'vue'
  import EstatisticasBox from '@/components/EstatisticasBox.vue'
  import { useAuthStore } from '@/stores/auth'
  import { useLivrosStore } from '@/stores/livros'

  const auth = useAuthStore()
  const livros = useLivrosStore()

  onMounted(async () => {
    if (auth.estaAutenticado && !livros.carregado) {
      await livros.carregar()
    }
  })
</script>

<template>
  <v-container class="py-10">
    <v-row align="center" class="mb-8">
      <v-col cols="12" md="7">
        <v-chip class="mb-4" color="accent" prepend-icon="mdi-school">Projeto acadêmico fullstack</v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black mb-4">Sebo Universitário</h1>

        <p class="text-h6 text-medium-emphasis mb-6">
          Sistema para cadastrar, listar, editar e excluir livros universitários,
          com frontend Vue 3 + Vuetify + Pinia, login com Google e banco PostgreSQL.
        </p>

        <div class="d-flex flex-wrap ga-3">
          <v-btn color="primary" prepend-icon="mdi-format-list-bulleted" size="large" :to="{ name: 'lista' }">
            Ver livros
          </v-btn>

          <v-btn color="accent" prepend-icon="mdi-plus" size="large" :to="{ name: 'cadastro' }">
            Cadastrar livro
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-6" color="primary" variant="flat">
          <v-icon class="mb-4" icon="mdi-bookshelf" size="80" />
          <h2 class="text-h5 mb-2">Controle seu acervo</h2>
          <p>Use o menu para navegar, fazer login e gerenciar os livros salvos no PostgreSQL.</p>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-if="!auth.estaAutenticado" class="mb-6" type="info" variant="tonal">
      Para ver estatísticas reais e usar o CRUD, entre com Google ou use o modo demonstração local.
    </v-alert>

    <EstatisticasBox
      v-else
      :disponiveis="livros.disponiveis"
      :indisponiveis="livros.indisponiveis"
      :total="livros.total"
    />
  </v-container>
</template>
