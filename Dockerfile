# ------------> build react-app
FROM node AS react-build
WORKDIR /usr/src
COPY ./client/ ./client/
RUN cd client && npm install && npm run build



# ------------> build server

FROM node:16-alpine
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --chown=node:node ./server/package*.json .

RUN npm ci --only=production

COPY --chown=node:node ./server .

COPY --chown=node:node --from=react-build /usr/src/client/build ./build

EXPOSE $PORT

USER node

CMD ["dumb-init", "node", "index.js"]