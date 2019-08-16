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
  helpers.getReposByUsername(username, (res)=>{
    res = JSON.parse(res);
    console.log('res from Github API: ', typeof res);
    res.map( res => {

      let save = {
        id: res.id,
        owner_login: username,
        name: res.name,
        html_url: res.html_url,
        description: res.description,
        forks_count: res.forks_count
      }

      console.log('data to be save', save);

      db.save(save, (results) => {
        console.log(results);
      })
    })

  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get((results) => {
    console.log(results);
    res.json(results);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

