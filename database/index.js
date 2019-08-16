const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//id(int), name, html_url, description, forks_count(int), owner.login
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  owner_login: String,
  name: String,
  html_url: String,
  description: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports = {
  save: (repo, callback) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    Repo.create(repo, (err, repo) => {
      if(err){
        callback(err)
      }else{
        callback(repo);
      }
    })
  },

  get: (callback) => {
    Repo.find({}, (err ,datas) =>{
      if(err){
        callback(err)
      }else{
        callback(datas);
      }
    })
  }
}
