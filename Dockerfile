FROM node:16-alpine3.16

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate
RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

CMD ["npm", "run", "dev"]
