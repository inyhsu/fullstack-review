const express = require('express');
let app = express();
var bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log(req.body.username);
  let username = req.body.username
  helpers.getReposByUsername(username, (data)=>{
    data = JSON.parse(data);

    data.map( data => {
      let save = {
        id: data.id,
        owner_login: username,
        name: data.name,
        html_url: data.html_url,
        description: data.description,
        forks_count: data.forks_count
      }

      db.save(save, (results) => {
        console.log(results);
        res.end();
      })
    })

  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get((results) => {
    // console.log(results);
    res.json(results);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

