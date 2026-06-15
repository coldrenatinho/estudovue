import { defineStore } from 'pinia'
import { apiFetch } from '@/services/api'
import { sairDoFirebase } from '@/services/firebase'

export interface Usuario {
  id: number
  name: string
  email: string
  avatarUrl: string | null
}

interface AuthResponse {
  token: string
  user: Usuario
}

const usuarioSalvo = localStorage.getItem('sebo.user')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('sebo.token') as string | null,
    user: usuarioSalvo ? JSON.parse(usuarioSalvo) as Usuario : null,
    carregando: false,
    erro: null as string | null,
  }),

  getters: {
    estaAutenticado: state => Boolean(state.token && state.user),
    demoAtivo: () => import.meta.env.VITE_ENABLE_DEMO_LOGIN !== 'false',
  },

  actions: {
    aplicarSessao (data: AuthResponse) {
      this.token = data.token
      this.user = data.user
      localStorage.setItem('sebo.token', data.token)
      localStorage.setItem('sebo.user', JSON.stringify(data.user))
    },

    async loginComFirebase (idToken: string) {
      this.carregando = true
      this.erro = null

      try {
        const data = await apiFetch<AuthResponse>('/auth/firebase', {
          method: 'POST',
          auth: false,
          body: JSON.stringify({ idToken }),
        })

        this.aplicarSessao(data)
      } catch (error) {
        this.erro = error instanceof Error ? error.message : 'Não foi possível entrar com Firebase.'
        throw error
      } finally {
        this.carregando = false
      }
    },

    async loginDemo () {
      this.carregando = true
      this.erro = null

      try {
        const data = await apiFetch<AuthResponse>('/auth/demo', {
          method: 'POST',
          auth: false,
        })

        this.aplicarSessao(data)
      } catch (error) {
        this.erro = error instanceof Error ? error.message : 'Não foi possível entrar no modo demonstração.'
        throw error
      } finally {
        this.carregando = false
      }
    },

    async buscarPerfil () {
      if (!this.token) {
        return
      }

      try {
        const data = await apiFetch<{ user: Usuario }>('/auth/me')
        this.user = data.user
        localStorage.setItem('sebo.user', JSON.stringify(data.user))
      } catch {
        this.logout()
      }
    },

    logout () {
      this.token = null
      this.user = null
      localStorage.removeItem('sebo.token')
      localStorage.removeItem('sebo.user')
      void sairDoFirebase()
    },
  },
})
