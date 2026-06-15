export interface Usuario {
  id: number
  googleSub: string
  name: string
  email: string
  avatarUrl: string | null
}

export interface Livro {
  id: number
  userId: number
  titulo: string
  autor: string
  ano: number
  preco: number
  genero: string
  disponivel: boolean
  createdAt: string
}
