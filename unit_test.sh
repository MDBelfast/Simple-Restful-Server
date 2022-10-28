#!/usr/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

docker compose build && docker compose up -d
if [ $? -ne 0 ] ; then
    printf "${RED}Docker Compose Failed${NC}\n"
    exit -1
else
    printf "${GREEN}Docker Compose success${NC}\n"
    ./wait-for-it.sh -t 0 0.0.0.0:5432 -- sleep 20
    bash ./psql_test.sh
fi
