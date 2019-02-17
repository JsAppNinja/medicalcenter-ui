FROM node:10.5.0-jessie

RUN apt-get update -y && \
  apt-get install -y libpng-dev && \
  apt-get install -y git && \
  apt-get install -y automake && \
  apt-get install -y autoconf && \
  apt-get install -y libtool && \
  apt-get install -y nasm && \
  apt-get install -y libpng12-dev

# Create app directory
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY .env /usr/src/app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN $HOME/.yarn/bin/yarn install

RUN yarn
RUN yarn run build

COPY . /usr/src/app

# "start": "cross-env NODE_ENV=development nodemon server",
# "start:production": "npm run test && npm run build && npm run start:prod",
# "start:prod": "cross-env NODE_ENV=production node server",
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
