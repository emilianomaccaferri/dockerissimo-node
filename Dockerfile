FROM node:14-alpine
WORKDIR /code
RUN apk add coreutils
RUN apk add yarn
COPY . .
RUN yarn install
RUN yarn global add typescript
RUN yarn global add nodemon
EXPOSE 8000
ENTRYPOINT ["./wait-for", "mysql:3306", "--", "yarn", "run", "app-dev"]
# ENTRYPOINT ["./wait-for", "mysql:3306", "--", "yarn", "run", "app-prod"]