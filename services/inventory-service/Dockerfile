# Inventory service Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
COPY .env ./

RUN npm install --silent

RUN npx prisma generate || true

EXPOSE 4002

CMD ["/bin/sh", "-c", "npx prisma migrate deploy || npx prisma migrate dev --name init && node dist/main.js"]
