FROM node:22-alpine

WORKDIR /app

#install pnpm
RUN npm install -g pnpm

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install 

COPY . .

# Accept build argument and set it as environment variable
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]