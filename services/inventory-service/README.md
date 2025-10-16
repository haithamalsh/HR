Inventory service (NestJS + Prisma)

To run locally with Docker Compose (recommended):

1. Ensure `postgres` service is enabled in the root `docker-compose.yml` and the host path `C:\\Users\\Elite\\.docker\\postgres-data` exists and is writable.
2. From repo root:

```bash
docker compose up --build inventory-service postgres
```

Running migrations (locally inside container):

```bash
# open a shell inside the inventory-service container
docker compose run --rm inventory-service sh -c "npx prisma migrate deploy"
```

Or run prisma migrate locally if you have prisma installed:

```bash
cd services/inventory-service
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```
