<template>
  <v-container class="py-8">
    <v-card class="pa-6" elevation="4">
      <v-card-title class="text-h4 font-weight-bold">Sobre o projeto</v-card-title>

      <v-card-text class="text-body-1">
        <p class="mb-4">
          O <strong>Sebo Universitário</strong> é um sistema acadêmico fullstack para gerenciar
          livros usados por estudantes. O usuário entra com Google, cadastra seus livros e os dados
          ficam armazenados em PostgreSQL.
        </p>

        <v-list>
          <v-list-item prepend-icon="mdi-account" subtitle="Renato — preencha aqui sua matrícula antes de entregar" title="Integrante" />
          <v-list-item prepend-icon="mdi-book-open-page-variant" subtitle="Sebo Universitário" title="Tema" />
          <v-list-item prepend-icon="mdi-vuejs" subtitle="Vue 3, Vuetify, Vue Router e Pinia" title="Frontend" />
          <v-list-item prepend-icon="mdi-nodejs" subtitle="Node.js, Express, JWT e Firebase Admin" title="Backend" />
          <v-list-item prepend-icon="mdi-database" subtitle="PostgreSQL em Docker Compose" title="Banco de dados" />
        </v-list>

        <v-alert class="mt-4" type="warning" variant="tonal">
          Antes de enviar ao professor, troque o texto do integrante e matrícula pelos seus dados reais.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
