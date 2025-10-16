# API Gateway (Nest minimal) Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm install --silent && npm run build || true

EXPOSE 3000
CMD ["npx", "ts-node", "src/main.ts"]
