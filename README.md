
<p align="center">
<img src="https://img.shields.io/github/contributors/mezamateoj/Read-Connect" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/mezamateoj/Read-Connect" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/mezamateoj/Read-Connect" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/mezamateoj/Read-Connect" alt="GitHub pull request" />
</p>


# Read Connect

[Read Connect](https://read-connect.vercel.app/) is a web application built with Next.js and Express.js. It allows users to search for books, add them to their reading list, and leave reviews.

![read-connect](https://pdfchatsbucket.s3.amazonaws.com/uploads/readconnect.png)

## ☁️ Deploy

### Check the full app here: [Read-Connect](https://read-connect.vercel.app/)

* The front is hosted on vercel
* The backend hosted on railway
* Postgres database is hosted on supabase and manage using prisma:


## 💻 Stack

- [supabase](https://supabase.com/): Supabase is an open source Firebase alternative. Use to manage the postgres database
- [nextjs](https://nextjs.org/): To build the frontend of the app, using the App Router. Brings back SSR.
- [clerk/clerk-sdk-node](https://github.com/clerkinc/clerk-sdk-node): Provides authentication and user management capabilities. **Use of webhooks to comunicate with db**
- [prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client): Offers a type-safe database client with auto-generated TypeScript types. ORM for postgres.
- [express](https://expressjs.com/): A fast and minimalist web application framework for server-side development.
- [typescript](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing and other features for enhanced development.
- [react-query](https://tanstack.com/query/latest/): For data mutation and better react requests
- [shadcn](https://ui.shadcn.com/docs): For reusable components
- [tailwind](https://tailwindcss.com/): To style the app

## 📝 Project Summary

- [api](api): API backend for the project.
- [api/controllers](api/controllers): Controllers for handling API requests.
- [api/prisma](api/prisma): Prisma ORM configuration and models.
- [api/routes](api/routes): Routes for API endpoints.
- [api/webhooks](api/webhooks): To handle communication between clerk and my database.
- [api/utils](api/utils): Utility functions for the API.
- [client](client): Frontend client for the project.
- [client/src/app](client/src/app): Main application components for the client.
- [client/src/components](client/src/components): Reusable UI components for the client.

## 🚀 Run Locally
clone the Read-Connect repository:
```sh
git clone https://github.com/mezamateoj/Read-Connect
```
install the dependencies with one of the package managers listed below:
```bash
cd client
```
```bash
npm install
```
```bash
cd api
```
```bash
npm install
```
start the server and front
```bash
  cd api npm start
```
```bash
  cd client npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

.env for the backend /api

`DATABASE_URL` : you can get this on [supabase](https://supabase.com/)

`CLERK_SECRET_KEY` : get it from [clerk](https://clerk.com/)

`WEEB_HOOK_SECRET` : get it from the dashboard of your clerk project [clerk](https://clerk.com/)

.env for the frontend /client

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: get it from [clerk](https://clerk.com/)

`CLERK_SECRET_KEY`: get it from [clerk](https://clerk.com/)

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

`NEXT_PUBLIC_API_URL=http://localhost:3001`








