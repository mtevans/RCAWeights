"use-strict";

const React = require('react');
const Link = require('react-router').Link;
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;
const LogInForm = require('./login_form.jsx');
const SignUpForm = require('./sign_up_form.jsx');


const Landing = React.createClass({
  render() {
      return(
          <div className='landing-page'>
            hello
            <LogInForm/>
            <SignUpForm/>
          </div>
        )
}
})

module.exports = Landing;
