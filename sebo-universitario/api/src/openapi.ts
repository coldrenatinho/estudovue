const apiBase = '/api'

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Sebo Universitário API',
    version: '1.0.0',
    description: 'API do projeto Sebo Universitário com autenticação JWT, Firebase e CRUD de livros.',
  },
  servers: [
    { url: 'http://localhost:4000', description: 'Ambiente local da API' },
    { url: '/', description: 'Mesmo host da aplicação' },
  ],
  tags: [
    { name: 'Saúde' },
    { name: 'Autenticação' },
    { name: 'Livros' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          googleSub: { type: 'string', example: 'firebase:123456789' },
          name: { type: 'string', example: 'Renato' },
          email: { type: 'string', format: 'email', example: 'renato@example.com' },
          avatarUrl: { type: 'string', nullable: true, example: 'https://example.com/avatar.png' },
        },
        required: ['id', 'googleSub', 'name', 'email', 'avatarUrl'],
      },
      Livro: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 10 },
          userId: { type: 'integer', example: 1 },
          titulo: { type: 'string', example: 'Clean Code' },
          autor: { type: 'string', example: 'Robert C. Martin' },
          ano: { type: 'integer', example: 2008 },
          preco: { type: 'number', example: 79.9 },
          genero: { type: 'string', example: 'Tecnologia' },
          disponivel: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time', example: '2026-06-15T17:00:00.000Z' },
        },
        required: ['id', 'userId', 'titulo', 'autor', 'ano', 'preco', 'genero', 'disponivel', 'createdAt'],
      },
      LoginFirebaseRequest: {
        type: 'object',
        properties: {
          idToken: { type: 'string', example: 'firebase-id-token' },
        },
        required: ['idToken'],
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'jwt-da-api' },
          user: { $ref: '#/components/schemas/Usuario' },
        },
        required: ['token', 'user'],
      },
      LivroInput: {
        type: 'object',
        properties: {
          titulo: { type: 'string', example: 'O Homem de Giz' },
          autor: { type: 'string', example: 'C. J. Tudor' },
          ano: { type: 'integer', example: 2018 },
          preco: { type: 'number', example: 39.9 },
          genero: { type: 'string', example: 'Suspense' },
          disponivel: { type: 'boolean', example: true },
        },
        required: ['titulo', 'autor', 'ano', 'preco', 'genero', 'disponivel'],
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          database: { type: 'string', example: 'connected' },
        },
      },
      ApiInfoResponse: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Sebo Universitário API' },
          version: { type: 'string', example: '1.0.0' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Mensagem de erro.' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Saúde'],
        summary: 'Verifica saúde da API e conexão com o banco',
        responses: {
          200: {
            description: 'API saudável',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthResponse' },
              },
            },
          },
        },
      },
    },
    [apiBase]: {
      get: {
        tags: ['Saúde'],
        summary: 'Identificação da API',
        responses: {
          200: {
            description: 'Informações da API',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiInfoResponse' },
              },
            },
          },
        },
      },
    },
    [`${apiBase}/auth/firebase`]: {
      post: {
        tags: ['Autenticação'],
        summary: 'Autentica com Firebase ID token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginFirebaseRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Token inválido',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    [`${apiBase}/auth/demo`]: {
      post: {
        tags: ['Autenticação'],
        summary: 'Autenticação de demonstração',
        responses: {
          200: {
            description: 'Login de demonstração realizado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' },
              },
            },
          },
          403: {
            description: 'Modo demonstração desativado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    [`${apiBase}/auth/me`]: {
      get: {
        tags: ['Autenticação'],
        summary: 'Retorna o usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Usuário autenticado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Usuario' },
              },
            },
          },
          401: {
            description: 'Não autenticado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    [`${apiBase}/livros`]: {
      get: {
        tags: ['Livros'],
        summary: 'Lista os livros do usuário autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de livros',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Livro' },
                },
              },
            },
          },
          401: {
            description: 'Não autenticado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
      post: {
        tags: ['Livros'],
        summary: 'Cria um novo livro',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LivroInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Livro criado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Livro' },
              },
            },
          },
          400: {
            description: 'Dados inválidos',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Não autenticado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    [`${apiBase}/livros/{id}`]: {
      put: {
        tags: ['Livros'],
        summary: 'Atualiza um livro existente',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LivroInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'Livro atualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Livro' },
              },
            },
          },
          400: {
            description: 'Dados inválidos',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Não autenticado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          404: {
            description: 'Livro não encontrado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
      delete: {
        tags: ['Livros'],
        summary: 'Remove um livro',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          204: {
            description: 'Livro removido',
          },
          400: {
            description: 'ID inválido',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Não autenticado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          404: {
            description: 'Livro não encontrado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
  },
} as const

export function swaggerHtml () {
  return `<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sebo Universitário API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #f7f4ef;
      }
      #swagger-ui {
        max-width: 1440px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api-docs/openapi.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout',
        })
      }
    </script>
  </body>
</html>`
}
