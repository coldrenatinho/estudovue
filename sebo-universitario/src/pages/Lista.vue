<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import LivroCard from '@/components/LivroCard.vue'
  import { type Livro, useLivrosStore } from '@/stores/livros'

  const livros = useLivrosStore()
  const router = useRouter()

  onMounted(async () => {
    await livros.carregar()
  })

  function editar (livro: Livro) {
    router.push({ name: 'cadastro', query: { id: livro.id } })
  }

  async function excluir (livro: Livro) {
    const confirmado = window.confirm(`Deseja excluir o livro "${livro.titulo}"?`)
    if (!confirmado) return

    await livros.excluir(livro.id)
  }
</script>

<template>
  <v-container class="py-8">
    <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Lista de livros</h1>
        <p class="text-medium-emphasis">Livros cadastrados no banco PostgreSQL do usuário logado.</p>
      </div>

      <v-btn color="primary" prepend-icon="mdi-plus" :to="{ name: 'cadastro' }">
        Novo livro
      </v-btn>
    </div>

    <v-alert v-if="livros.erro" class="mb-4" type="error" variant="tonal">
      {{ livros.erro }}
    </v-alert>

    <v-progress-linear v-if="livros.carregando" class="mb-4" color="primary" indeterminate />

    <v-alert v-if="!livros.carregando && livros.livros.length === 0" type="info" variant="tonal">
      Nenhum livro cadastrado ainda. Clique em "Novo livro" para começar.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="livro in livros.livros"
        :key="livro.id"
        cols="12"
        lg="4"
        md="6"
      >
        <LivroCard :livro="livro" @editar="editar" @excluir="excluir" />
      </v-col>
    </v-row>
  </v-container>
</template>
