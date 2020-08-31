FROM node:13.12.0-alpine

WORKDIR /app
COPY package.json ./
COPY ./images ./images 
COPY ./public ./public
COPY ./src ./src
RUN rm -rf ./src/components/msal-1.x
RUN npm install

CMD ["npm", "start"]