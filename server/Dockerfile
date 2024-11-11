FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000


CMD ["sh", "-c", "npm run migrate-seed && npm start"]