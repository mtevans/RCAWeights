"use-strict";

const React = require('react');
const Link = require('react-router').Link;
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;
const SessionActions = require('../../actions/session_actions.js');
const SessionStore = require('../../stores/session_store.js');



const SignUpForm = React.createClass({

  getInitialState() {
    return {
      username: "",
      password: "",
      authErrors: SessionStore.authErrors(),
      currentUser: SessionStore.isUserLoggedIn()
    };
  },

  componentDidMount(){
    this.errorListener = SessionStore.addListener(this._onErrorsChange);
    this.sessionListener = SessionStore.addListener(this._onLoggingIn)
  },

  componentWillUnmount(){
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  _onErrorsChange(){
    this.setState({authErrors: SessionStore.authErrors() });
    this.setState({currentUser: SessionStore.isUserLoggedIn() })
  },

  _onLoggingIn(){
    if (SessionStore.isUserLoggedIn() ){
      this.props.callback();
    };
  },

  _onChange(property) {
    return (e) => this.setState({[property]: e.target.value});
  },



  handleSubmit(e){
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    SessionActions.signUp(data);
    hashHistory.push('/home')
  },

  render(){
    let authErrors = this.state.authErrors;
    if(authErrors.length !== 0){
      authErrors = authErrors.map( error => {
        if(error[0] === "has already been taken"){
        return <h3 className="username error">A user with the username {this.state.username} already exists with us</h3> ;
        }
        return <h3 className="password error">Your password {error}</h3>
      })
    };

    return (
      <div className="form">
      <form className="log-in-form" onSubmit={this.handleSubmit}>
        <h2>SIGN UP</h2>
          <input type="text" placeholder="Name" value={this.state.username} onChange={this._onChange("username")}
            className="login-input" />


          <input  type="password" placeholder="Password" value={this.state.password} onChange={this._onChange("password")}
            className="login-input" />

        {authErrors}
        <div onClick={this.handleSubmit} id='sign-up' className="demo-submit">
          <span className="label">Create&nbsp;Account</span>
        </div>
      </form>
      </div>
    )
  }
});


module.exports = SignUpForm;
