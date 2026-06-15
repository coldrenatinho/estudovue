# Documentação Frontend — Vue 3, Vuetify, Pinia

## Objetivo

O frontend é a interface do Sebo Universitário. Ele permite login, navegação entre páginas e CRUD de livros consumindo a API Node.

## Stack

- Vue 3 com Composition API.
- Vite.
- Vuetify.
- Vue Router.
- Pinia.
- TypeScript.

## Arquivos principais

```txt
src/main.ts
src/App.vue
src/router/index.ts
src/plugins/index.ts
src/plugins/vuetify.ts
src/services/api.ts
src/stores/auth.ts
src/stores/livros.ts
```

## Páginas

```txt
src/pages/Home.vue      Página inicial e estatísticas
src/pages/Login.vue     Login Google e modo demonstração
src/pages/Lista.vue     Listagem de livros
src/pages/Cadastro.vue  Cadastro e edição
src/pages/Sobre.vue     Informações acadêmicas
```

## Componentes próprios

```txt
src/components/EstatisticasBox.vue
src/components/LivroCard.vue
```

## Fluxo de autenticação

1. Usuário acessa `/login`.
2. Se houver configuração `VITE_FIREBASE_*`, o botão de login Firebase fica ativo.
3. O frontend chama `signInWithPopup` com `GoogleAuthProvider`.
4. O Firebase retorna um ID token do usuário.
5. O frontend envia o ID token para `POST /api/auth/firebase`.
6. O backend retorna JWT interno e dados do usuário.
7. A store `auth` salva token e usuário no `localStorage`.
8. Rotas protegidas usam `router.beforeEach`.

Modo demonstração:

1. Botão chama `POST /api/auth/demo`.
2. Backend gera usuário demo.
3. O restante do fluxo é igual ao login real.

## Fluxo do CRUD

A store `src/stores/livros.ts` centraliza as operações:

- `carregar()` -> GET /api/livros
- `salvar()` -> POST ou PUT
- `excluir()` -> DELETE

As telas não acessam o banco diretamente. Elas conversam com a store, e a store conversa com a API.

## Boas práticas do frontend

- Não duplicar regra de negócio nas páginas.
- Manter chamadas HTTP dentro de `src/services` ou `src/stores`.
- Usar componentes pequenos e reutilizáveis.
- Evitar valores fixos espalhados; concentrar listas como `generos` na store.
- Sempre tratar estado de carregamento e erro.

## Checklist frontend

- [ ] Menu navega para todas as rotas.
- [ ] `/lista` e `/cadastro` exigem login.
- [ ] Login demo funciona sem configuração Firebase.
- [ ] Formulário valida campos obrigatórios.
- [ ] Lista vazia mostra mensagem amigável.
- [ ] Card mostra título, autor, ano, preço, gênero e disponibilidade.
- [ ] Botão editar preenche formulário.
- [ ] Botão excluir pede confirmação.
- [ ] Tema Vuetify aparece visualmente.

## Comandos úteis

```bash
bun install
bun dev
bun run lint
bun run build
```
