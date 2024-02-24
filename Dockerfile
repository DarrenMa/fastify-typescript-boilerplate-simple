FROM node:20-alpine AS ts-compiler
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:20-alpine AS ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/package*.json ./
COPY --from=ts-compiler /app/dist /app/dist
RUN npm install --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=ts-remover /app ./
CMD npm run start
