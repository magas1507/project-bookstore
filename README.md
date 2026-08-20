# BookStore Manager CLI

Sistema de gerenciamento de livraria via terminal (CLI) desenvolvido com Node.js, TypeScript e PostgreSQL usando Docker.

## Objetivo

Gerenciar autores, livros, clientes e empréstimos de uma livraria, com persistência em PostgreSQL, arquitetura em camadas e interface CLI interativa.

##  Tecnologias

- **Runtime:** Node.js 18+
- **Linguagem:** TypeScript 5
- **Banco de Dados:** PostgreSQL 15 (Alpine)
- **Containerização:** Docker Compose
- **Drivers:** pg (PostgreSQL)
- **CLI:** readline-sync
- **Qualidade:** ESLint + Prettier

## Requisitos

- Docker Desktop (ou Docker + Docker Compose)
- Node.js 18+
- PNPM

##  Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/magas1507/project-bookstore.git
cd project-bookstore
```

### 2. Instalar dependências
```bash
pnpm install
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

### 4. Iniciar Docker
```bash
pnpm run docker:up
pnpm run docker:logs
```

### 5. Executar a aplicação
```bash
pnpm run dev
```

## Login Padrão

- Email: `admin@bookstore.com`
- Senha: `admin123`

Outros usuários:
- `maria@bookstore.com` / `maria123`
- `joao@bookstore.com` / `joao123`

## 🏗 Arquitetura

Arquitetura em camadas com separação de responsabilidades

## Funcionalidades

- [x] Login de funcionário
- [x] CRUD de autores, livros e clientes
- [x] Empréstimos e devoluções com transações
- [x] Relatórios gerenciais
- [x] Validações de regras de negócio
- [x] Tratamento de erros

##  Dados de Teste

- 5 autores brasileiros e internacionais
- 12 livros de diversos gêneros
- 8 clientes com emails e telefones
- 10 empréstimos (5 ativos + 5 devolvidos)
- 3 funcionários para login

## Integrantes

- Magas