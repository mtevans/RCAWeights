const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const Home = React.createClass({
  render(){
    
    return(
      <div>
        hello {currentUser.username}
      </div>
    )
  }
})


module.exports = Home
