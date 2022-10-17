#!/usr/bin/bash

docker exec -it $(docker ps -aqf "name=simple_restful-db-1") psql -U postgres -c "select * from users;"

