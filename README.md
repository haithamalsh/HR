IMAP minimal scaffold

Services:
- services/asset-service: minimal Express-based asset service (port 4001)
- services/api-gateway: simple proxy gateway (port 3000) forwarding /api/assets to asset-service
- services/inventory-service: minimal inventory service (port 4002)
- frontend/src/AssetsList.tsx: React component that fetches /api/assets

Quick start (Windows cmd):

cd services\asset-service
npm install
start "" npm run start

# in a new terminal
cd services\api-gateway
npm install
start "" npm run start

# optional inventory
cd services\inventory-service
npm install
start "" npm run start

Frontend: integrate `frontend/src/AssetsList.tsx` into your React app and run the app with proxy pointing to http://localhost:3000 or run the frontend dev server and set a proxy in package.json.

Inventory service (Prisma/Postgres)
----------------------------------

The `inventory-service` is implemented with NestJS + Prisma and expects a Postgres database (the root `docker-compose.yml` includes a `postgres` service that binds data to `C:\Users\Elite\.docker\postgres-data`).

To run everything via Docker Compose:

```cmd
docker compose up --build
```

To run inventory migrations locally:

```cmd
cd services\inventory-service
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start
```

Deployment
----------
Use `deploy/deploy.sh` or the GitHub Actions workflow (`.github/workflows/deploy.yml`) to push the repo to a remote server and run `docker compose up -d --build` there. See `README_DEPLOY.md` for details.