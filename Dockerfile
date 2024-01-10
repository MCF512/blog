FROM node:20

WORKDIR /usr/src/blog

COPY . .

RUN npm install -g npm@10.2.5
RUN npm i
RUN npm i -g serve
RUN npm run build

COPY . .

EXPOSE 4000

CMD [ "serve", "-s", "build", "-l", "4000" ]