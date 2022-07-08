ARG NODE_IMAGE=node:14.17.3-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir /home/node/app/ && chown -R node:node /home/node
WORKDIR /home/node/app
USER node

FROM base AS dependencies
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm ci
USER rootdis
USER node

FROM dependencies AS build
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm run build

# angular has problems building himself using alpine... so we use node image as base
# so later we swiitch to alpine to keep docker image small
FROM base AS deploy
WORKDIR /home/node/app
COPY --from=dependencies /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/dist ./
COPY --from=build /home/node/app/server.js ./
EXPOSE 2200
CMD node server.js
