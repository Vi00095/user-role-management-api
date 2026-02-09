# User Role Management API

API REST de gestion des utilisateurs, rôles et permissions,
développée avec NestJS, Prisma et PostgreSQL.

## Stack technique

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Fonctionnalités

- Authentification (Register / Login)
- Gestion des utilisateurs
- Gestion des rôles
- Gestion des permissions
- Attribution rôles -> utilisateurs
- Ajout permissions -> rôles
- Protection des routes par permissions

## Architecture

src/
├── auth/
├── permissions/
├── prisma/
├── role-permissions/
├── roles/
├── user-roles/
├── users/
├── app.module.ts
└── main.ts

## Prérequis

- Node.js >= 18
- PostgreSQL
- pnpm

## Installation

```bash
$ git clone https://github.com/Vi00095/user-role-management-api.git

$ cd user-role-management-api

$ pnpm install
```

### Configuration

Créer un fichier .env:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_TOKEN_SECRET="super_secret"
JWT_TOKEN_EXPIRES_IN='1d'
```

### Migration Prisma

```bash
$ pnpm prisma migrate dev
```

### Lancer le projet

```bash
$ pnpm start:dev
```

## Sécurité

- Authentification par JWT
- Guards NestJS
- Décorateurs de permissions
- Protection des routes sensibles

## Auteur

Vatosoa Andriafihorenantsalama
Développeur Web Full-Stack
🔗 https://github.com/Vi00095
