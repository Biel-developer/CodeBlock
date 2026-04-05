# Guia de Formulários

## Estrutura Básica

Formulários simples usam `useState` + `handleSubmit`:

```tsx
import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
}

export function MeuFormulario() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await meuHttpService.create(formData);
      // sucesso
    } catch (error) {
      // erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campos */}
    </form>
  );
}
```

## Formulários com Ant Design

Páginas como **ProfilePage** e **UsersCreateUpdatePage** usam `Form` do Ant Design:

```tsx
import { Form, Input, Button } from 'antd';

export function MeuFormAntd() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await meuHttpService.create(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Nome" name="name"
        rules={[{ required: true, message: 'Campo obrigatório' }]}>
        <Input placeholder="Nome completo" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
```

## Validação

Use as funções utilitárias de `src/utils/validators/`:

```tsx
import { validateCPF } from '@utils/validators/validateCPF';
import { validateEmail } from '@utils/validators/validateEmail';

const validate = (data: FormData) => {
  const errors: Record<string, string> = {};

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!validateCPF(data.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  return errors;
};
```

## Máscaras

Use as funções de `src/utils/masks/`:

```tsx
import { maskCPF } from '@utils/masks/maskCPF';
import { maskPhone } from '@utils/masks/maskPhone';

<input
  value={maskCPF(formData.cpf)}
  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
/>
```

## Notificações de Feedback

Use o contexto `useNotification` para feedback ao usuário:

```tsx
import { useNotification } from '@context/Notification';

const { showNotification } = useNotification();

// Após sucesso
showNotification('success', 'Registro salvo com sucesso!');

// Após erro
showNotification('error', 'Erro ao salvar. Tente novamente.');
```

## Componentes de Formulário Disponíveis

| Componente | Localização | Descrição |
|------------|-------------|-----------|
| `<Form>` | `src/components/Form/` | Container de formulário customizado |
| `<InputText>` | `src/components/InputText/` | Campo de texto reutilizável |
| `<Button>` | `src/components/Button/` | Botão com variantes |
| `<Modal>` | `src/components/Modal/` | Modal para formulários em dialog |
| Ant Design `<Form>` | `antd` | Formulários completos com validação built-in |

## Boas Práticas

1. **Sempre desabilite o botão** durante submissão (`loading` state)
2. **Mostre erros** de forma clara ao lado do campo
3. **Use tipos TypeScript** para `FormData` — nunca `any`
4. **Use máscaras** para CPF, telefone, etc — melhora a UX
5. **Limpe o formulário** após sucesso quando fizer sentido
6. **Use `useNotification`** para feedback — não use `alert()`
