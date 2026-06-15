# Firebase no Sebo Universitário

## Objetivo

Configurar o Firebase para o login real com Google no frontend e a validação do ID token no backend.

## O que precisa ser criado

1. Projeto Firebase.
2. Provedor Google no Authentication.
3. App Web no projeto Firebase.
4. Service account para o backend.

## 1. Criar o projeto

1. Acesse o Firebase Console.
2. Clique em `Add project`.
3. Escolha o nome do projeto.
4. Conclua a criação.

## 2. Habilitar login Google

1. Abra `Authentication`.
2. Clique em `Get started`.
3. Vá em `Sign-in method`.
4. Ative `Google`.
5. Salve.

Esse passo libera o login real do frontend Vue.

## 3. Criar o App Web

1. Vá em `Project settings`.
2. Na seção de apps, clique em `Web`.
3. Registre o app.
4. Copie a configuração gerada.

Use esses valores no frontend:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Essas variáveis ficam no `.env` do projeto e no deploy da imagem web.

## 4. Criar a Service Account

1. Ainda em `Project settings`, abra `Service accounts`.
2. Gere uma nova chave privada.
3. Baixe o JSON.

No backend, use uma destas abordagens:

### Opção A: base64 do JSON

Gere o base64 do arquivo JSON e coloque em:

```txt
FIREBASE_SERVICE_ACCOUNT_BASE64
```

### Opção B: variáveis separadas

Preencha:

```txt
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

Para a `FIREBASE_PRIVATE_KEY`, mantenha as quebras de linha como `\n`.

## 5. Exemplo de fluxo

1. Frontend faz login com Google.
2. Firebase entrega um `idToken`.
3. O frontend envia esse token para `POST /api/auth/firebase`.
4. O backend valida com Firebase Admin.
5. A API cria o usuário local e devolve o JWT interno.

## 6. Modo demonstração

Se você ainda não configurou o Firebase, o projeto pode funcionar em modo demonstração.

Use:

```txt
ENABLE_DEMO_LOGIN=true
```

## 7. Checklist rápido

- [x] Projeto Firebase criado.
- [x] Google habilitado no Authentication.
- [x] App Web criado.
- [x] Variáveis `VITE_FIREBASE_*` preenchidas.
- [x] Service account criada.
- [x] `FIREBASE_SERVICE_ACCOUNT_BASE64` ou `FIREBASE_*` do backend preenchidos.
- [x] `.env` não foi commitado.

