# Estrutura do Projeto

## Visão Geral

O CodeBlock é um sistema de freelancers construído com React + TypeScript + Vite.
A arquitetura segue o padrão de **features isoladas**, onde cada módulo de negócio
é autocontido com suas próprias páginas, serviços HTTP e rotas.

## 📂 Estrutura de Diretórios

### Configurações Raiz

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Configuração do Vite (path aliases, plugins) |
| `tsconfig.json` | Configuração do TypeScript |
| `Dockerfile` | Configuração Docker |
| `index.html` | HTML raiz |
| `.env` / `.env.example` | Variáveis de ambiente |

### `docs/`

Documentação do projeto (este arquivo, workflow e guia de formulários).

### `public/`

Arquivos estáticos servidos diretamente pelo Vite. Contém a pasta `fonts/` com fontes customizadas.

---

## 📦 `src/` — Código Fonte

### `ability/`

Tipos de permissões usando **CASL**. Define as `Actions` (create, read, update, delete, manage) e os `Subjects` (User, Project, Freelancer, Notification).

### `components/`

Componentes reutilizáveis **globais** usados em qualquer parte do projeto:

| Componente | Descrição |
|------------|-----------|
| `Button/` | Botão customizado com variantes |
| `ContentPage/` | Layout de conteúdo de página |
| `Form/` | Container de formulário |
| `InputText/` | Campo de texto |
| `ListPage/` | Layout para páginas de listagem |
| `Modal/` | Modal reutilizável |
| `Table/` | Tabela de dados |
| `Toast/` | Notificações toast (conectado ao NotificationContext) |

### `config/`

Configurações globais da aplicação (nome do app, versão, opções de paginação, chaves de storage).

### `context/`

Estado global via **Context API**:

| Contexto | Responsabilidade |
|----------|-----------------|
| `UserAuthentication/` | Estado de login, dados do usuário, funções `login()` e `logout()` |
| `Notification/` | Fila de notificações toast com `showNotification()` |
| `SideBar/` | Controle de aberto/fechado da barra lateral |

### `features/`

Módulos de negócio **isolados**. Cada feature contém:
- `pages/` — Componentes de página
- `http/` — Serviço HTTP específico (herda de `HttpService`)
- `routes/` — Rotas da feature

**Features existentes:**

| Feature | Descrição | Páginas |
|---------|-----------|---------|
| `auth/` | Autenticação | LoginPage, RegisterPage |
| `dashboard/` | Dashboard principal | HomePage |
| `users/` | Gestão de usuários (CRUD) | UsersListPage, UsersCreateUpdatePage |
| `profile/` | Perfil do usuário logado | ProfilePage |
| `error/` | Páginas de erro | NotFoundPage (404) |
| `notifications/` | Notificações | (placeholder para implementação futura) |

### `hooks/`

Hooks customizados reutilizáveis:

| Hook | Descrição |
|------|-----------|
| `useAsync/` | Gerencia estado de operações assíncronas (data, loading, error) |
| `usePagination/` | Lógica de paginação (currentPage, totalPages, goToPage) |

### `http/`

Camada HTTP com **Adapter Pattern**:

```
http/
├── IHttpAdapter.ts       # Interface: get, post, put, patch, delete
├── HttpService.ts        # Classe base (escolhe Mock ou Axios automaticamente)
├── adapters/
│   ├── AxiosAdapter/     # Implementação real → backend via Axios
│   └── MockAdapter/      # Implementação mock → localStorage (sem backend)
├── interceptors/
│   └── AuthInterceptor/  # Interceptor de autenticação
└── CitiesHttpService/    # Serviço de cidades
```

**Como funciona o swap:** O `HttpService` verifica `Environment.ENABLE_MOCK_API` no construtor.
Se `true` → usa `MockAdapter`. Se `false` → usa `AxiosAdapter`. Nenhum código de feature precisa mudar.

### `layouts/`

Layouts estruturais da aplicação:

| Layout | Descrição |
|--------|-----------|
| `AppLayout/` | Layout principal que combina header + sidebar + área de conteúdo |
| `AppHeaderBar/` | Barra superior com logo, nome do usuário e ações |
| `AppSideBar/` | Menu lateral com navegação (Dashboard, Usuários, Notificações) |

### `providers/`

`AppProviders/` — Wrapper que agrupa todos os providers da aplicação (UserAuthentication → Notification → SideBar).

### `routes/`

Sistema de rotas centralizado:

| Arquivo | Descrição |
|---------|-----------|
| `index.tsx` | Combina rotas públicas e privadas |
| `public.tsx` | `/login`, `/register`, `/404` |
| `private.tsx` | `/` (dashboard), `/users/*`, `/profile/*` |
| `utils.tsx` | `PrivateRoute` — redireciona para login se não autenticado |

### `services/`

Serviços de lógica de negócio:

- `UserAuthenticationService/` — Helpers de token e dados do usuário no localStorage
- `NotificationsService/` — (placeholder)

### `storage/`

Pasta reservada para adaptadores de persistência local (extensível).

### `utils/`

Funções utilitárias organizadas por tipo:

| Pasta | Funções |
|-------|---------|
| `validators/` | `validateCPF`, `validateEmail` |
| `masks/` | `maskCPF`, `maskPhone` |
| `formatters/` | `formatDate`, `formatNumber` |

---

## 🎯 Princípios de Organização

1. **Modularidade** — Cada feature é isolada e independente
2. **Adapter Pattern** — Camada HTTP desacoplada (Mock/Real via flag)
3. **Escalabilidade** — Novas features seguem o mesmo padrão de pastas
4. **Separação de Responsabilidades** — Cada pasta tem um propósito claro
5. **Reversibilidade** — Modo standalone pode ser desligado sem alterar código
