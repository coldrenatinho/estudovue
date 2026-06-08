# Configuração inicial do Create Vuetify

Este documento registra as escolhas feitas na criação do projeto **Sebo Universitário** com o comando:

```bash
bun create vuetify
```

A ideia é entender o que cada opção significa, sem apenas apertar `Enter` sem saber o motivo.

---

## 1. Preset inicial

Pergunta exibida:

```txt
Start from a preset?
```

Opções vistas:

```txt
Start from scratch
Base
Full
Vuetify
bun
```

### Opção escolhida

```txt
Start from scratch
```

### O que significa

Essa opção permite configurar o projeto manualmente, escolhendo framework, CSS, recursos extras, router e gerenciador de pacotes.

### Por que escolhemos

Escolhemos essa opção porque o objetivo da trilha é aprender o que cada parte faz. Assim, em vez de aceitar um pacote pronto, configuramos conscientemente cada recurso.

---

## 2. Nome do projeto

Pergunta exibida:

```txt
Project name:
```

### Opção escolhida

```txt
sebo-universitario
```

### O que significa

Esse será o nome da pasta criada para o projeto Vue/Vuetify.

### Por que escolhemos

O tema obrigatório inicial da trilha é **Sebo Universitário**, então o nome da pasta acompanha o nome do sistema.

---

## 3. Framework

Pergunta exibida:

```txt
Which framework would you like to use?
```

### Opção escolhida

```txt
Vue
```

### O que significa

Define que o projeto será criado com Vue.js.

### Por que escolhemos

A trilha exige **Vue.js 3 com Composition API**.

---

## 4. CSS framework

Pergunta exibida:

```txt
Which CSS framework?
```

### Opção vista no terminal

```txt
Tailwind CSS
```

### O que significa

Tailwind CSS é uma biblioteca de classes utilitárias para estilização.

Exemplo de classe Tailwind:

```html
<div class="p-4 text-center">
  Conteúdo
</div>
```

### Observação importante

Neste projeto acadêmico, o foco visual principal deve ser o **Vuetify**.

Se houver opção para escolher sem Tailwind, CSS simples ou Sass, prefira evitar Tailwind neste primeiro projeto para não misturar muitos conceitos ao mesmo tempo.

### Por que ter cuidado

Misturar Tailwind e Vuetify pode funcionar, mas pode confundir no começo, porque os dois ajudam a resolver problemas de visual e layout de formas diferentes.

---

## 5. Features extras

Pergunta exibida:

```txt
Select features to install
```

Opções vistas:

```txt
ESLint
Router
MCP
Pinia
I18n
```

---

### 5.1 ESLint

#### O que significa

ESLint é uma ferramenta que analisa o código JavaScript/Vue e aponta problemas de padrão, organização e possíveis erros.

#### Recomendação

```txt
Selecionar
```

#### Por que usar

Ajuda a aprender boas práticas e encontrar erros mais cedo.

---

### 5.2 Router

#### O que significa

Instala e configura o Vue Router, biblioteca usada para navegar entre páginas.

Exemplo de rotas do projeto:

```txt
/          -> Home
/lista     -> Lista
/cadastro  -> Cadastro
/sobre     -> Sobre
```

#### Recomendação

```txt
Selecionar
```

#### Por que usar

A atividade acadêmica exige navegação entre páginas. Então o Router é obrigatório para a nossa trilha.

---

### 5.3 MCP

#### O que significa

MCP significa Model Context Protocol. É uma integração voltada para ferramentas de IA e automação.

#### Recomendação

```txt
Não selecionar
```

#### Por que não usar agora

Não é necessário para a aplicação acadêmica de CRUD local. Adicionar MCP agora aumentaria a complexidade sem ajudar no objetivo principal.

---

### 5.4 Pinia

#### O que significa

Pinia é uma biblioteca de gerenciamento de estado para Vue.

Ela ajuda a compartilhar dados entre componentes e páginas de forma profissional.

#### Recomendação

```txt
Não selecionar nesta primeira etapa
```

#### Por que não usar agora

A regra da trilha inicial é usar CRUD local com `ref`/`reactive`, mantendo os dados em um arquivo compartilhado:

```txt
src/store/itens.js
```

Então vamos aprender o estado compartilhado de forma simples antes de usar Pinia.

---

### 5.5 I18n

#### O que significa

I18n é internacionalização. Serve para criar aplicações em vários idiomas.

#### Recomendação

```txt
Não selecionar
```

#### Por que não usar agora

O projeto será feito em português e não precisa de múltiplos idiomas neste momento.

---

## 6. Tipo de Router

Pergunta exibida:

```txt
Which router would you like to use?
```

Opções vistas:

```txt
None
Vue Router (Standard Vue Router)
Vue Router (File-based)
```

### Opção escolhida

```txt
Vue Router (Standard Vue Router)
```

### O que significa

Usa o Vue Router tradicional, com um arquivo de configuração de rotas.

Normalmente esse arquivo fica em:

```txt
src/router/index.js
```

### Por que escolhemos

É a melhor opção para aprender os fundamentos, porque vamos ver claramente:

- onde as rotas são declaradas;
- como importar páginas;
- como usar `path`;
- como usar `<router-view />`;
- como navegar com botões e links.

### Por que não usamos File-based Router

O router baseado em arquivos cria rotas automaticamente de acordo com os arquivos da pasta de páginas. Isso pode ser prático, mas esconde parte da configuração que queremos aprender agora.

---

## 7. Package manager

Pergunta exibida:

```txt
Which package manager would you like to use?
```

Opções vistas:

```txt
npm
pnpm
yarn
deno
bun
```

### Opção escolhida

```txt
bun
```

### O que significa

Define que o projeto usará Bun para instalar dependências e executar scripts.

### Comandos que vamos usar

```bash
bun install
bun dev
```

### Por que escolhemos

A trilha do projeto define Bun como ferramenta principal.

---

## Resumo das escolhas recomendadas

```txt
Preset: Start from scratch
Project name: sebo-universitario
Framework: Vue
CSS framework: evitar Tailwind se houver opção simples
Features: ESLint e Router
Router: Vue Router (Standard Vue Router)
Package manager: bun
```

---

## Próximo passo após criar o projeto

Depois que o assistente terminar, entrar na pasta criada:

```bash
cd sebo-universitario
```

Instalar dependências:

```bash
bun install
```

Rodar o projeto:

```bash
bun dev
```

Verificar no navegador se a tela inicial abriu sem erros vermelhos no console.
