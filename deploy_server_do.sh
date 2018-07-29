#! /bin/bash
yarn build:server
heroku container:push web
heroku container:release web

# docker build -t jcarraway/abb:latest .
# docker push jcarraway/abb:latest
# ssh root@206.189.224.43 "docker pull jcarraway/abb:latest && docker tag jcarraway/abb:latest dokku/abb:latest && dokku tags:deploy abb latest" 