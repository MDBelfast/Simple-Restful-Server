#!/usr/bin/bash

docker-compose exec -T $(docker ps -aqf "name=postgres_db") psql -U postgres -c "select * from users;" 1> db_init_test.txt
sed -i -e "s/\r//g" db_init_test.txt

diff init_data.txt db_init_test.txt > /dev/null 2>&1
error=$?
if [ $error -eq 0 ]
then
   echo "init_data.txt and db_init_test.txt are the same file"
elif [ $error -eq 1 ]
then
   echo "init_data.txt and db_init_test.txt differ"
else
   echo "There was something wrong with the diff command"
fi

