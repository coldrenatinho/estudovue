<script setup lang="ts">
  import type { Livro } from '@/stores/livros'

  defineProps<{
    livro: Livro
  }>()

  defineEmits<{
    editar: [livro: Livro]
    excluir: [livro: Livro]
  }>()

  const moeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
</script>

<template>
  <v-card class="h-100" elevation="4">
    <v-card-title class="d-flex align-start justify-space-between ga-3">
      <span>{{ livro.titulo }}</span>

      <v-chip :color="livro.disponivel ? 'success' : 'warning'" size="small">
        {{ livro.disponivel ? 'Disponível' : 'Indisponível' }}
      </v-chip>
    </v-card-title>

    <v-card-subtitle>{{ livro.autor }} • {{ livro.ano }}</v-card-subtitle>

    <v-card-text>
      <v-list density="compact">
        <v-list-item prepend-icon="mdi-bookmark" subtitle="Gênero" :title="livro.genero" />
        <v-list-item prepend-icon="mdi-cash" subtitle="Preço" :title="moeda.format(livro.preco)" />
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn color="primary" prepend-icon="mdi-pencil" variant="tonal" @click="$emit('editar', livro)">
        Editar
      </v-btn>

      <v-btn color="error" prepend-icon="mdi-delete" variant="tonal" @click="$emit('excluir', livro)">
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
