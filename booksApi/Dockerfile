ARG NODE_IMAGE=node:16.15-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown -R node:node /home/node
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
WORKDIR /home/node/app
COPY --chown=node:node ./package*.json ./
RUN npm ci
USER root
USER node
COPY --chown=node:node . .

ENV NODE_ENV $NODE_ENV
ENV PORT=$PORT
ENV HOST=0.0.0.0
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
