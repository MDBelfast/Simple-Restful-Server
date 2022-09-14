var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//for connecting to Postgres server.
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'tien-tsewu',
    password : 'testdb',
    database : 'testdb'
  }
});

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

var objArr = []; // used to store data listed for geting all.
app.get('/listUsers', function (req, res) {
   knex.select('*').from('users')
      .then(function (data) {
         data.forEach(function(v,i){
            objArr= [...objArr, {[v.userid]:
                                   {"name" : v.name,
                                    "password": v.password,
                                    "profession": v.profession,
                                    "id": v.id}}]
         })
         res.end(JSON.stringify(objArr));
		 console.log(objArr);
   });
})

app.post('/addUser', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = req.body["user4"];
      console.log(data);

      var newdata = JSON.stringify(data);
      fs.writeFile('users.json', newdata, err => {
         // error checking
         if(err) throw err;
      });   

      res.end( JSON.stringify(data));
   });
})

app.delete('/deleteUser/:Id', function (req, res) {
   const Id = Number(req.params.Id);
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log("delete %d\n", Id);
      data = JSON.parse( data );
      delete data["user" + Id];
      console.log( data );
      res.end( JSON.stringify(data));
 });
});

app.put('/putUser/:Id', function (req, res) {
   const Id = Number(req.params.Id);
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = req.body["user" + Id];
      console.log(data);

      var newdata = JSON.stringify(data);
      fs.writeFile('users.json', newdata, err => {
         // error checking
         if(err) throw err;
      });   

      res.end( JSON.stringify(data));
   });

   res.end( JSON.stringify(req.body));
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
