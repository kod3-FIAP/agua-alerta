<div align="center">
  <img src="public/logo.svg" alt="Logo" width="60" height="66"/>
  <h1 style="margin: 0; font-size: 2.5rem; color: #0078D8">Água Alerta</h1>
</div>

## Descrição

Projeto para monitoramento e gestão de eventos extremos relacionados a alagamentos, utilizando **Node.js**, **Prisma** e **SQLite**.

---

## Instalação

1. **Instale as dependências do projeto:**

   ```bash
   pnpm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com as variáveis de ambiente fornecidas da documentação do projeto (PDF).
   </br>

3. **Execute o seed do banco de dados:**
   ```bash
   pnpm seed
   ```

---

## Executando a aplicação

Inicie o servidor de desenvolvimento na porta 3000:

```bash
pnpm dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Scripts úteis

- `pnpm install` — Instala as dependências
- `pnpm dev` — Inicia o servidor em modo desenvolvimento
- `pnpm seed` — Popula o banco de dados com dados iniciais
- `npx prisma studio` — Interface visual para o banco de dados
