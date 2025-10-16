# Asset service Dockerfile
FROM node:18-alpine
WORKDIR /app

# Install build deps
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install --silent && npm run build

EXPOSE 4001
CMD ["node", "dist/index.js"]
