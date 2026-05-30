# Lista Super – API

Back-end do projeto **Lista Super**. Fornece gestão de usuários, listas de compras, categorias e itens.

---

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **Prisma ORM**
- **Zod** (validação de schemas)
- **bcrypt** (hash de senhas)

---

## 📑 Padrão de Commits (Gitmoji)

Usamos **Gitmoji** para padronizar mensagens de commit. Formato recomendado:

```
<emoji> <tipo>: <resumo curto>

# Exemplo
🎉 init: configurações iniciais do projeto
```

### Tabela rápida (mais usados)

| Emoji | Código            | Quando usar                               |
| ----- | ----------------- | ----------------------------------------- |
| 🎉    | `:tada:`          | Primeira versão/commit inicial            |
| ✨    | `:sparkles:`      | Nova funcionalidade (feature)             |
| 🐛    | `:bug:`           | Correção de bug                           |
| ♻️    | `:recycle:`       | Refatoração (sem mudar comportamento)     |
| 🎨    | `:art:`           | Melhorias de estilo/organização do código |
| 🧪    | `:test_tube:`     | Testes (adicionar/ajustar)                |
| 📝    | `:memo:`          | Documentação (README, docs)               |
| 🔧    | `:wrench:`        | Configurações (lint, env, CI, etc.)       |
| 🗃️    | `:card_file_box:` | Migrations/alterações de banco            |
| 🚚    | `:truck:`         | Mover/renomear arquivos/pastas            |
| 🔥    | `:fire:`          | Remover código/arquivos                   |
| 🚀    | `:rocket:`        | Deploy/infra                              |
| 🔒    | `:lock:`          | Correções de segurança                    |
| 📦    | `:package:`       | Adicionar/atualizar dependências          |
| ⬆️    | `:arrow_up:`      | Upgrade de versão                         |
| ⬇️    | `:arrow_down:`    | Downgrade de versão                       |

### Exemplos práticos

```bash
# inicialização
git commit -m "🎉 init: configurações iniciais do projeto"

# nova rota
git commit -m "✨ feat: cria endpoint POST /users"

# migration do banco
git commit -m "🗃️ chore: adiciona migration inicial do banco"

# documentação
git commit -m "📝 docs: adiciona README com padrão de commits"
```

> Dica: mantenha o **resumo com até ~72 caracteres** e, se precisar, use o corpo do commit para detalhes.

---

## 🌿 Padrão de Branches

Adotamos um fluxo simples baseado em **Git Flow enxuto**:

- **`main`** → branch estável (produção)
- **`dev`** → branch de integração (desenvolvimento)
- **`feat/<nome>`** → novas funcionalidades
  - exemplo: `feat/auth-login`
- **`fix/<nome>`** → correções de bug
  - exemplo: `fix/validacao-email`
- **`chore/<nome>`** → tarefas de manutenção/configuração
  - exemplo: `chore/atualiza-dependencias`
- **`docs/<nome>`** → alterações em documentação
  - exemplo: `docs/readme-commits`

### 🔀 Fluxo sugerido

1. Crie sua branch a partir de `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/nome-da-feature
   ```

2. Faça seus commits seguindo o padrão Gitmoji.
3. Abra um Pull Request para `dev`.
4. Após testes/validação, `dev` pode ser mesclada em `main`.

---

## 📄 Licença

MIT
