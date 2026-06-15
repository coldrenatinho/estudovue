<script setup lang="ts">
  import { computed, onMounted, reactive, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { generos, useLivrosStore } from '@/stores/livros'

  const livros = useLivrosStore()
  const route = useRoute()
  const router = useRouter()

  const formulario = reactive({
    id: null as number | null,
    titulo: '',
    autor: '',
    ano: new Date().getFullYear(),
    preco: 0,
    genero: 'Computação',
    disponivel: true,
  })

  const estaEditando = computed(() => Boolean(formulario.id))

  function limparFormulario () {
    formulario.id = null
    formulario.titulo = ''
    formulario.autor = ''
    formulario.ano = new Date().getFullYear()
    formulario.preco = 0
    formulario.genero = 'Computação'
    formulario.disponivel = true
  }

  function carregarLivroParaEdicao () {
    const id = Number(route.query.id || 0)
    if (!id) {
      limparFormulario()
      return
    }

    const livro = livros.livros.find(item => item.id === id)
    if (!livro) return

    formulario.id = livro.id
    formulario.titulo = livro.titulo
    formulario.autor = livro.autor
    formulario.ano = livro.ano
    formulario.preco = livro.preco
    formulario.genero = livro.genero
    formulario.disponivel = livro.disponivel
  }

  async function salvarLivro () {
    if (!formulario.titulo.trim() || !formulario.autor.trim() || !formulario.genero) {
      return
    }

    await livros.salvar({ ...formulario })
    router.push({ name: 'lista' })
  }

  onMounted(async () => {
    if (!livros.carregado) {
      await livros.carregar()
    }

    carregarLivroParaEdicao()
  })

  watch(() => route.query.id, carregarLivroParaEdicao)
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" lg="7" md="8">
        <v-card elevation="5">
          <v-card-title class="text-h4 font-weight-bold">
            {{ estaEditando ? 'Editar livro' : 'Cadastrar livro' }}
          </v-card-title>

          <v-card-subtitle>
            Preencha os dados do livro universitário. Os dados serão salvos no PostgreSQL.
          </v-card-subtitle>

          <v-card-text>
            <v-alert v-if="livros.erro" class="mb-4" type="error" variant="tonal">
              {{ livros.erro }}
            </v-alert>

            <v-form @submit.prevent="salvarLivro">
              <v-text-field
                v-model="formulario.titulo"
                label="Título"
                prepend-inner-icon="mdi-book"
                required
              />

              <v-text-field
                v-model="formulario.autor"
                label="Autor"
                prepend-inner-icon="mdi-account-edit"
                required
              />

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="formulario.ano"
                    label="Ano"
                    prepend-inner-icon="mdi-calendar"
                    required
                    type="number"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="formulario.preco"
                    label="Preço"
                    min="0"
                    prefix="R$"
                    required
                    step="0.01"
                    type="number"
                  />
                </v-col>
              </v-row>

              <v-select
                v-model="formulario.genero"
                :items="generos"
                label="Gênero"
                prepend-inner-icon="mdi-tag"
                required
              />

              <v-switch
                v-model="formulario.disponivel"
                color="success"
                label="Livro disponível"
              />

              <div class="d-flex justify-end ga-3 mt-4">
                <v-btn :to="{ name: 'lista' }" variant="tonal">Cancelar</v-btn>

                <v-btn color="primary" :loading="livros.carregando" prepend-icon="mdi-content-save" type="submit">
                  {{ estaEditando ? 'Salvar alterações' : 'Cadastrar' }}
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
