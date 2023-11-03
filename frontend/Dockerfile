FROM node:20

WORKDIR /app/frontend

COPY frontend/package.json

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]