const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const SessionActions = require('./actions/session_actions.js');
const Landing = require('./components/user/landing.jsx');
const Home = require('./components/display/home.jsx');

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={Landing}>

    </Route>
    <Route path="/home" component={Home} />
  </Router>
);


document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render( appRouter , document.getElementById('content')
  );
  SessionActions.receiveCurrentUser(window.currentUser)
});
