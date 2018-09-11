
FROM node:9.11.1

ENV NPM_CONFIG_LOGLEVEL warn

COPY package-lock.json package.json /var/www/app/

WORKDIR /var/www/app

RUN npm install

COPY . /var/www/app

RUN npm run dev

# VOLUME [ "~/jmac_dev/that-react-app-you-want/src/:/var/www/app/src" ]

EXPOSE 8080

CMD ["npm", "run", "start"]

# docker run -v ~/jmac_dev/that-react-app-you-want/src/:/var/www/app/src -p 8080:8080 hax
