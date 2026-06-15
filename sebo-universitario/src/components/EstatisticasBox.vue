<script setup lang="ts">
  defineProps<{
    total: number
    disponiveis: number
    indisponiveis: number
  }>()
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card class="pa-4" color="primary" variant="flat">
        <div class="text-overline">Total de livros</div>
        <div class="text-h3 font-weight-bold">{{ total }}</div>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card class="pa-4" color="success" variant="flat">
        <div class="text-overline">Disponíveis</div>
        <div class="text-h3 font-weight-bold">{{ disponiveis }}</div>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card class="pa-4" color="warning" variant="flat">
        <div class="text-overline">Emprestados / vendidos</div>
        <div class="text-h3 font-weight-bold">{{ indisponiveis }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>
