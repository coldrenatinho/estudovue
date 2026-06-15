import { defineStore } from 'pinia'
import { apiFetch } from '@/services/api'

export interface Livro {
  id: number
  titulo: string
  autor: string
  ano: number
  preco: number
  genero: string
  disponivel: boolean
  createdAt?: string
}

export type LivroPayload = Omit<Livro, 'id' | 'createdAt'> & {
  id?: number | null
}

export const generos = [
  'Administração',
  'Computação',
  'Didático',
  'Engenharia',
  'Literatura',
  'Medicina',
  'Tecnologia',
]

export const useLivrosStore = defineStore('livros', {
  state: () => ({
    livros: [] as Livro[],
    carregando: false,
    carregado: false,
    erro: null as string | null,
  }),

  getters: {
    total: state => state.livros.length,
    disponiveis: state => state.livros.filter(livro => livro.disponivel).length,
    indisponiveis: state => state.livros.filter(livro => !livro.disponivel).length,
  },

  actions: {
    async carregar () {
      this.carregando = true
      this.erro = null

      try {
        this.livros = await apiFetch<Livro[]>('/livros')
        this.carregado = true
      } catch (error) {
        this.erro = error instanceof Error ? error.message : 'Erro ao carregar livros.'
        throw error
      } finally {
        this.carregando = false
      }
    },

    async salvar (payload: LivroPayload) {
      this.carregando = true
      this.erro = null

      const body = {
        titulo: payload.titulo.trim(),
        autor: payload.autor.trim(),
        ano: Number(payload.ano),
        preco: Number(payload.preco),
        genero: payload.genero,
        disponivel: Boolean(payload.disponivel),
      }

      try {
        const livro = payload.id
          ? await apiFetch<Livro>(`/livros/${payload.id}`, { method: 'PUT', body: JSON.stringify(body) })
          : await apiFetch<Livro>('/livros', { method: 'POST', body: JSON.stringify(body) })

        const index = this.livros.findIndex(item => item.id === livro.id)
        if (index === -1) {
          this.livros.unshift(livro)
        } else {
          this.livros[index] = livro
        }

        return livro
      } catch (error) {
        this.erro = error instanceof Error ? error.message : 'Erro ao salvar livro.'
        throw error
      } finally {
        this.carregando = false
      }
    },

    async excluir (id: number) {
      this.carregando = true
      this.erro = null

      try {
        await apiFetch(`/livros/${id}`, { method: 'DELETE' })
        this.livros = this.livros.filter(livro => livro.id !== id)
      } catch (error) {
        this.erro = error instanceof Error ? error.message : 'Erro ao excluir livro.'
        throw error
      } finally {
        this.carregando = false
      }
    },
  },
})
