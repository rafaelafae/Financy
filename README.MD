# 💰 Financy — Gestão Financeira Pessoal

> **Projeto de Conclusão de Curso** — **Pós Tech Developer 360 (Turma 4)** da **Faculdade Rocketseat**.  
> Interface e design system baseados no protótipo oficial do **Figma** disponibilizado pela instituição.

**Financy** é uma aplicação web full-stack desenvolvida para o controle e acompanhamento financeiro pessoal. O projeto combina uma interface moderna, pixel-perfect e acessível, alinhada às especificações de design do Figma, com uma API robusta orientada a GraphQL e persistência de dados via Prisma ORM.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** com **TypeScript**
- **Vite** para build e empacotamento rápido
- **Tailwind CSS** para estilização utilitária
- **Shadcn/UI & Radix UI** para componentes acessíveis e consistentes
- **Apollo Client** para consumo e gerenciamento de cache da API GraphQL
- **Lucide React** para iconografia
- **Zustand** para gerenciamento de estado global (autenticação e sessão)
- **Sonner** para notificações e feedbacks em tempo real

### Backend
- **Node.js** com **TypeScript**
- **TypeGraphQL** para construção de esquemas GraphQL com decorators tipados
- **Apollo Server** & **Express**
- **Prisma ORM** para modelagem e mapeamento objeto-relacional
- **SQLite** para banco de dados relacional local
- **JWT (JSON Web Token)** e **Bcrypt** para autenticação e hash de senhas

---

## 🎯 Principais Funcionalidades

- **Dashboard:**
  - Resumo de Saldo Total, Receitas do Mês e Despesas do Mês calculados em tempo real.
  - Lista de transações recentes com formatação de data curta e atalho para nova transação.
  - Resumo de categorias ordenadas por maior volume financeiro e total de itens.
- **Transações (`/transactions`):**
  - Tabela com layout estrito (`table-fixed`), larguras dedicadas e paginação customizada.
  - Filtros combinados por busca de texto, tipo (Entrada/Saída), categoria e período (mês/ano).
  - Criação, edição e exclusão de transações.
- **Categorias (`/categories`):**
  - Indicadores superiores: total de categorias, total de transações e categoria mais utilizada (com ícone e cor dinâmicos).
  - Listagem em cards com identificador visual, badges de cores e contagem de itens via `_count` do Prisma.
  - Criação, edição e exclusão de categorias.
- **Perfil do Usuário (`/profile`):**
  - Avatar gerado a partir das iniciais do nome.
  - Visualização de informações cadastrais e encerramento de sessão com confirmação.

---

## 📁 Estrutura de Pastas

```text
financy/
├── backend/
│   ├── prisma/
│   │   ├── migrations/            # Histórico de migrações da base de dados
│   │   ├── dev.db                 # Base de dados SQLite local
│   │   ├── prisma.ts              # Instância do cliente Prisma
│   │   └── schema.prisma          # Modelos de dados (User, Category, Transaction)
│   ├── src/
│   │   ├── dtos/                  # DTOs de entrada e argumentos (Inputs)
│   │   ├── graphql/               # Configurações de contexto e tipos base GraphQL
│   │   ├── middlewares/           # Middlewares de autenticação e proteção (ex: IsAuth)
│   │   ├── models/                # Modelos de saída e ObjectTypes do TypeGraphQL
│   │   ├── resolvers/             # Resolvers GraphQL (Queries e Mutations)
│   │   ├── services/              # Camada de regras de negócio e consultas Prisma
│   │   ├── utils/                 # Funções utilitárias e auxiliares
│   │   └── index.ts               # Ponto de entrada e arranque do servidor
│   ├── .env                       # Variáveis de ambiente
│   ├── .env.example               # Exemplo de configuração das variáveis
│   ├── package.json               # Dependências e scripts do backend
│   ├── schema.graphql             # Schema GraphQL gerado automaticamente
│   └── tsconfig.json              # Configurações do compilador TypeScript
│
└── frontend/
    ├── public/                    # Ficheiros públicos estáticos
    ├── src/
    │   ├── assets/                # Imagens, logótipos e vetores SVG
    │   ├── components/            # Componentes reutilizáveis e UI (Shadcn/UI)
    │   ├── lib/                   # Configurações de clientes (Apollo Client, GraphQL queries/mutations)
    │   ├── pages/                 # Páginas da aplicação (Dashboard, Transactions, Categories, Profile, Login)
    │   ├── stores/                # Gestão de estado global com Zustand (ex: auth)
    │   ├── types/                 # Definições de tipos e interfaces TypeScript
    │   ├── App.tsx                # Roteamento e configuração global de provedores
    │   ├── index.css              # Estilos globais e diretivas do Tailwind CSS
    │   └── main.tsx               # Ponto de entrada da aplicação React
    ├── .env                       # Variáveis de ambiente do frontend
    ├── .env.example               # Exemplo das variáveis do frontend
    ├── components.json            # Configuração dos componentes Shadcn/UI
    ├── eslint.config.js           # Configuração de linting do código
    ├── index.html                 # Template HTML principal
    ├── package.json               # Dependências e scripts do frontend
    ├── tsconfig.json              # Configurações TypeScript base
    ├── tsconfig.app.json          # Configurações TypeScript para a app
    ├── tsconfig.node.json         # Configurações TypeScript para o Node/Vite
    └── vite.config.ts             # Configurações de build e alias do Vite
```

---

## ⚙️ Guia Passo a Passo: Como Executar o Projeto

Siga as etapas abaixo para preparar o ambiente e rodar o frontend e o backend simultaneamente na sua máquina.

### Pré-requisitos
Certifique-se de ter instalado previamente:
- **Node.js** (versão 18.x ou superior recomendada)
- Gerenciador de pacotes **npm** (ou **yarn** / **pnpm**)
- **Git**

---

### Passo 1: Clonar o Repositório

Abra o seu terminal e execute:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/financy.git

# Acesse o diretório raiz do projeto
cd financy
```

---

### Passo 2: Configurar e Rodar o Backend

1. Abra um terminal e navegue até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale todas as dependências do servidor:
   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente com base no template:
   ```bash
   cp .env.example .env
   ```
   *Abra o arquivo `.env` gerado e confirme que as variáveis essenciais estão definidas:*
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="sua_chave_secreta_aqui"
   PORT=4000
   ```

4. Execute as migrations do Prisma para estruturar o banco SQLite:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor da API em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O backend estará rodando. Você pode conferir o playground GraphQL acessando `http://localhost:4000/graphql`.*

---

### Passo 3: Configurar e Rodar o Frontend

1. Abra um **segundo terminal** (mantendo o terminal do backend rodando) e vá para a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências da interface:
   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente do cliente:
   ```bash
   cp .env.example .env
   ```
   *Verifique se a variável aponta para a URL do seu backend:*
   ```env
   VITE_API_URL="http://localhost:4000/graphql"
   ```

4. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```

---

### Passo 4: Acessar a Aplicação

Com os dois terminais em execução:
1. Abra seu navegador em: `http://localhost:5173`
2. Crie uma nova conta pela página de registro ou faça login.
3. Cadastre suas primeiras categorias e transações para visualizar o preenchimento automático das métricas no Dashboard!

---

## 🎓 Projeto e Licença

Este projeto foi desenvolvido como **Trabalho de Conclusão do Módulo Expansão de Habilidades** da pós-graduação **Pós Tech Developer 360 (Turma 4)** pela **Faculdade Rocketseat**.

- **Design & Protótipo:** Fornecido pela equipe de produto/design da **Rocketseat** no Figma.
- **Desenvolvimento Full-Stack:** Implementação completa da aplicação (Frontend em React/TypeScript e Backend em Node.js/GraphQL/Prisma).

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.