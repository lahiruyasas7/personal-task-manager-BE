FROM node:22-alpine

WORKDIR /app

#install pnpm
RUN npm install -g pnpm

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install 

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]