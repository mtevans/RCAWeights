const React = require('react');
const Link = require('react-router').Link;
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;
const SessionActions = require('../../actions/session_actions.js');
const SessionStore = require('../../stores/session_store.js');


const LoginForm = React.createClass({
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

  _onChange(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  _onLoggingIn(){
    if (SessionStore.isUserLoggedIn() ){
      this.props.callback();
    };
    hashHistory.push('/home');
  },

  handleSubmit(e){
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    SessionActions.logIn(data);
  },


  render(){
    let authErrors = this.state.authErrors;
    if(authErrors.length !== 0){
      authErrors.map( error => {

        return( <h3 className='sign-in-errors'>{error}</h3>) ;
      })
    };


    return (
      <div className="form">
      <form className="log-in-form" onSubmit={this.handleSubmit}>
          <h2>LOG IN</h2>
          <input type="text" placeholder="Username" value={this.state.username} onChange={this._onChange("username")}
            className="login-input" />


          <input type="password" placeholder="Password" value={this.state.password} onChange={this._onChange("password")}
            className="login-input" />

        {authErrors}
        <div onClick={this.handleSubmit} id='sign-in' className="demo-submit">
          <span className="label">Log&nbsp;In</span>
        </div>
      </form>
    </div>
    )
  }
});


module.exports = LoginForm;
