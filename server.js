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
    host : process.env.DB_HOST,
    port : 5432,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
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

// insert user4 from client.
app.post('/addUser', function (req, res) {
   let post_data = req.body;
   let userId = Object.keys(post_data)[0]; // get the user key, "user4"
   knex('users').insert({userid: (Object.keys(post_data))[0],
                         name: post_data[userId]["name"],
                         password: post_data[userId]["password"],
                         profession: post_data[userId]["profession"],
                         id: post_data[userId]["id"]})
                .then(()=>{});
})

app.delete('/deleteUser/:Id', function (req, res) {
   const Id = Number(req.params.Id);
   knex('users')
      .where('id', Id)
      .del()
      .then(()=>{});
});

app.put('/putUser/:Id', function (req, res) {
   const Id = Number(req.params.Id);
   var user = "user" + Id;
   const user_data = req.body[user];

   knex('users')
     .where('id', Id)
     .update({
        userid : user,
        name: user_data["name"],
        password: user_data["password"],
        profession: user_data["profession"],
        id : Id
   })
   .then(()=>{})

   res.end( JSON.stringify(req.body));
});

var server = app.listen(8081, '0.0.0.0', function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
