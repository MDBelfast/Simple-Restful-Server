# Simple-Restful-Server
A simple Restful server

After clone, run the below:

```
$ npm install express
$ npm i cors express nodemon
$ npm install body-parser --save
```

run the server.js

```
$ node server.js
```

use web browser to open html file.

[development footprint](https://hackmd.io/xVprDfcvSBCCnY9bNfgTlA?view)

run the server by docker-compose

```
$ docker compose up --build
```

use `Ctrl-C` to stop the container.

Stop and remove containers, networks.
`--volumes` is used to remove volumes attached to the container.
```
$ docker compose down --volumes
```

To delete all containers including its volumes use
```
docker rm -vf $(docker ps -aq)
```

To delete all the images,
```
$ docker rmi -f $(docker images -aq)
```

To remove the volume of database, remove the directory `db` created for volume of Postgres

[note about docker](https://hackmd.io/kX1Wg2UqQl2Nzbl3wn3EKQ?view)
[note about Postgres](https://hackmd.io/zAT2OGu4ThGpTdb3M28pqA?view)

