# Fluxo de Trabalho

## Desenvolvimento de Features

### 1. Criando uma Nova Feature

Crie uma pasta em `src/features/nome-da-feature/` com a seguinte estrutura:

```
src/features/nome-da-feature/
├── http/
│   └── NomeHttpService/
│       └── index.ts          # Serviço HTTP (herda de HttpService)
├── pages/
│   └── NomePage/
│       ├── index.tsx          # Componente da página
│       └── NomePage.css       # Estilos (opcional)
├── routes/
│   └── index.tsx              # Rotas da feature
└── index.ts                   # Barrel export
```

### 2. Registrando a Feature nas Rotas

Adicione as rotas no arquivo correspondente:

- **Rota pública** (sem login): `src/routes/public.tsx`
- **Rota privada** (requer login): `src/routes/private.tsx`

Exemplo de rota privada:
```tsx
// src/routes/private.tsx
import { NomeRoutes } from '@features/nome-da-feature/routes';

export const privateRoutes: RouteObject[] = [
  // ... rotas existentes
  { path: '/nome/*', element: <NomeRoutes /> },
];
```

### 3. Criando um Serviço HTTP

Herde de `HttpService` — o swap Mock/Axios é automático:

```typescript
// src/features/nome-da-feature/http/NomeHttpService/index.ts
import { HttpService } from '@http/HttpService';

export class NomeHttpService extends HttpService {
  constructor() {
    super('/nome'); // base path da API
  }

  async getAll(): Promise<Item[]> {
    const response = await this.get<{ status: string; data: Item[] }>();
    return response.data;
  }
}

export const nomeHttpService = new NomeHttpService();
```

### 4. Adicionando Rota Mock (se em modo standalone)

Se precisar que a nova feature funcione no modo mock, adicione a rota no `MockAdapter`:

```
src/http/adapters/MockAdapter/index.ts → função resolveRoute()
```

### 5. Componentes

- **Componentes globais** (usados em várias features) → `src/components/`
- **Componentes específicos** (usados só numa feature) → `src/features/[feature]/components/`

Cada componente segue a estrutura:
```
NomeComponente/
├── index.tsx
└── NomeComponente.module.css  # ou .css
```

### 6. Gerenciamento de Estado

| Tipo | Onde |
|------|------|
| Estado local (formulário, toggle) | `useState`, `useReducer` |
| Estado global (auth, sidebar) | `src/context/` (Context API) |
| Lógica reutilizável async | `src/hooks/` (hooks customizados) |

---

## Workflow Git

```bash
# Criar branch da feature
git checkout -b feature/nome-da-feature

# Desenvolver e commitar
git add .
git commit -m "feat: adiciona nome da feature"

# Push e Pull Request
git push origin feature/nome-da-feature
```

### Padrão de Commits

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `refactor:` | Refatoração sem mudar comportamento |
| `style:` | Formatação, CSS |
| `docs:` | Documentação |
| `test:` | Testes |

---

## Build e Deploy

```bash
# Build local
yarn build

# Preview do build
yarn preview

# Deploy
git push origin main
```

---

## Boas Práticas

1. **Sempre tipifique** com TypeScript — evite `any`
2. **Escreva testes** para lógica crítica
3. **Use hooks customizados** para lógica reutilizável
4. **Mantenha componentes pequenos** e focados em uma responsabilidade
5. **Use path aliases** (`@features/`, `@components/`, `@context/`) em vez de caminhos relativos longos
6. **Siga o padrão de features** — cada módulo isolado com seus próprios pages/http/routes
7. **Documente** funções complexas com JSDoc
