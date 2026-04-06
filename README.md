# CodeBlock

Sistema de Freelancers desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** — Biblioteca para interfaces de usuário
- **TypeScript** — Superset tipado do JavaScript
- **Vite** — Build tool rápida e moderna
- **Ant Design** — Biblioteca de componentes UI
- **React Router** — Roteamento SPA
- **Axios** — Cliente HTTP
- **CASL** — Gerenciamento de permissões
- **Context API** — Gerenciamento de estado global
- **Docker** — Containerização

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd CodeBlock

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env
```

## 🚀 Uso

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build

# Preview do build
yarn preview

# Testes
yarn test
yarn test:watch
yarn test:coverage
```

## 🧪 Modo Standalone (Mock)

O projeto pode funcionar **sem backend** para demonstrações e apresentações.
Quando a flag `ENABLE_MOCK_API` está ativa (padrão), todas as chamadas HTTP
são interceptadas por um `MockAdapter` que usa localStorage como banco de dados local.

- Login aceita qualquer credencial
- Cadastro cria usuários no localStorage
- CRUD de usuários funciona localmente
- Dados persistem entre recarregamentos da página

**Para conectar a um backend real**, basta alterar no `.env`:

```env
VITE_ENABLE_MOCK_API=false
VITE_API_BASE_URL=http://seu-backend.com/api
```

## 🏗️ Arquitetura

### Features (Módulos de Negócio)

Cada feature é um módulo isolado e autocontido:

- `pages/` — Páginas da feature
- `http/` — Serviços HTTP específicos
- `routes/` — Rotas da feature

### Sistema de Rotas

| Arquivo | Descrição |
|---------|-----------|
| `routes/public.tsx` | Rotas sem autenticação (login, cadastro) |
| `routes/private.tsx` | Rotas protegidas (dashboard, usuários, perfil) |
| `routes/utils.tsx` | Guards de autenticação (`PrivateRoute`) |

### Camada HTTP

Arquitetura baseada em **Adapter Pattern**:

- `IHttpAdapter` — Interface base
- `AxiosAdapter` — Implementação real (Axios → backend)
- `MockAdapter` — Implementação local (localStorage, sem backend)
- `HttpService` — Classe base que faz o swap automático via flag

### Gerenciamento de Estado

- **Context API** — Autenticação, Notificações, SideBar
- **Hooks customizados** — `useAsync`, `usePagination`
- **localStorage** — Persistência de sessão e dados mock

## 📁 Estrutura do Projeto

```
CodeBlock/
├── index.html                # HTML raiz
├── package.json              # Dependências e scripts
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração TypeScript
├── Dockerfile                # Containerização
├── .env                      # Variáveis de ambiente
├── .env.example              # Exemplo de variáveis
│
├── docs/                     # Documentação
│   ├── project-structure.md  # Estrutura detalhada
│   ├── workflow.md           # Fluxo de trabalho
│   └── forms.md              # Guia de formulários
│
├── public/
│   └── fonts/                # Fontes customizadas
│
└── src/
    ├── main.tsx              # Ponto de entrada
    ├── App.tsx               # Componente raiz (BrowserRouter + Providers)
    ├── Environment.ts        # Variáveis de ambiente centralizadas
    ├── globalVariables.css   # Variáveis CSS globais
    ├── vite-env.d.ts         # Tipos do Vite
    │
    ├── ability/              # Tipos de permissões (CASL)
    │   └── types.ts
    │
    ├── components/           # Componentes reutilizáveis globais
    │   ├── Button/
    │   ├── ContentPage/
    │   ├── Form/
    │   ├── InputText/
    │   ├── ListPage/
    │   ├── Modal/
    │   ├── Table/
    │   └── Toast/
    │
    ├── config/               # Configurações globais da aplicação
    │   └── index.ts
    │
    ├── context/              # Estado global (Context API)
    │   ├── UserAuthentication/   # Login, logout, dados do usuário
    │   ├── Notification/         # Sistema de notificações toast
    │   └── SideBar/              # Estado aberto/fechado da sidebar
    │
    ├── features/             # Módulos de negócio isolados
    │   ├── auth/             # Autenticação
    │   │   ├── http/AuthHttpService/   # API de login/registro
    │   │   ├── pages/LoginPage/        # Tela de login
    │   │   ├── pages/RegisterPage/     # Tela de cadastro
    │   │   └── routes/
    │   │
    │   ├── dashboard/        # Dashboard principal
    │   │   ├── pages/HomePage/
    │   │   └── routes/
    │   │
    │   ├── users/            # Gestão de usuários
    │   │   ├── http/UsersHttpService/       # CRUD de usuários
    │   │   ├── pages/UsersListPage/         # Listagem
    │   │   ├── pages/UsersCreateUpdatePage/ # Criação/Edição
    │   │   └── routes/
    │   │
    │   ├── profile/          # Perfil do usuário logado
    │   │   ├── http/ProfileHttpService/
    │   │   ├── pages/ProfilePage/
    │   │   └── routes/
    │   │
    │   ├── error/            # Páginas de erro
    │   │   ├── pages/NotFoundPage/
    │   │   └── routes/
    │   │
    │   └── notifications/    # Notificações (placeholder)
    │
    ├── hooks/                # Hooks customizados
    │   ├── useAsync/         # Gerencia estados de requisições async
    │   └── usePagination/    # Lógica de paginação
    │
    ├── http/                 # Camada HTTP
    │   ├── IHttpAdapter.ts           # Interface do adapter
    │   ├── HttpService.ts            # Classe base (swap Mock/Axios)
    │   ├── adapters/
    │   │   ├── AxiosAdapter/         # Implementação real (backend)
    │   │   └── MockAdapter/          # Implementação mock (localStorage)
    │   ├── interceptors/
    │   │   └── AuthInterceptor/
    │   └── CitiesHttpService/
    │
    ├── layouts/              # Layouts da aplicação
    │   ├── AppLayout/        # Layout principal (header + sidebar + content)
    │   ├── AppHeaderBar/     # Barra superior
    │   └── AppSideBar/       # Menu lateral
    │
    ├── providers/            # Providers React agrupados
    │   └── AppProviders/     # Wrapper de todos os providers
    │
    ├── routes/               # Sistema de rotas
    │   ├── index.tsx         # Roteamento principal
    │   ├── private.tsx       # Rotas protegidas
    │   ├── public.tsx        # Rotas públicas
    │   └── utils.tsx         # PrivateRoute guard
    │
    ├── services/             # Serviços de lógica de negócio
    │   ├── UserAuthenticationService/
    │   └── NotificationsService/
    │
    ├── storage/              # Persistência local (extensível)
    │
    └── utils/                # Funções utilitárias
        ├── validators/       # validateCPF, validateEmail
        ├── masks/            # maskCPF, maskPhone
        └── formatters/       # formatDate, formatNumber
```

## 🔐 Autenticação

O fluxo de autenticação usa Context API + localStorage:

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

- No **modo mock**: qualquer credencial faz login, token é gerado localmente
- No **modo real**: faz POST para `/users/login` no backend

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção |
| `yarn preview` | Preview do build |

| `yarn lint` | Verifica código com ESLint |
| `yarn format` | Formata com Prettier |
| `yarn type-check` | Verifica tipos TypeScript |

## 🐳 Docker

```bash
docker build -t codeblock .
docker run -p 80:80 codeblock
```

## 📚 Documentação

- [Estrutura do Projeto](docs/project-structure.md)
- [Fluxo de Trabalho](docs/workflow.md)
- [Guia de Formulários](docs/forms.md)

## 📄 Licença

Este projeto está sob a licença MIT.


CodeBlock
Nome de Alunos
Gabriel do Nascimento Cano Andrade
RA: 23000555-2

Lucas de Oliveira Lima
RA: 23000810-2

Lucca Rocha Oliveira
RA: 25184113-2

Alexandre Lozano de Souza
RA: 23003803-2

Daniel Andrade
RA: 23000397-2

Felipe Broetto Araujo
RA: 23167564-2

Felipe Duarte Milleo Consulim
RA: 23011046-2