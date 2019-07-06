FROM node:10-alpine
MAINTAINER Form.io <support@form.io>
COPY . /src
WORKDIR /src
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual .build-deps bash git make gcc g++ python openssh-client && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
RUN npm config set python /usr/bin/python
RUN npm i -g npm && npm ci --production
RUN npm cache clean --force && apk del .build-deps
EXPOSE 80
CMD ["npm", "start"]

