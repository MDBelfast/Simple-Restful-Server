#!/usr/bin/zsh

docker compose down --volumes
docker rmi -f $(docker images -aq)
rm -rf db

