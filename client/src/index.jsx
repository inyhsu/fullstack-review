import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.get = this.get.bind(this);
    this.search = this.search.bind(this);
    this.showData = this.showData.bind(this);
  }

  componentDidMount(){
    this.get()
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {username: term})
    .then(res => {
      this.get();
    })
    .catch(err => console.log(err))
  }

  get(){
    axios.get('/repos')
    .then(res => {
      let data =res.data
      data.sort(function(a, b) {
        var countA = a.forks_count
        var countB = b.forks_count
        if (countA < countB) {
          return 1;
        }
        if (countA > countB) {
          return -1;
        }
        return 0;
      })
      data = data.slice(0,26)
      // console.log(data);
      this.setState({
        repos: data
      })
    })
    .catch(err => console.log(err))
  }

  showData(){
    return this.state.repos
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.showData()}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));