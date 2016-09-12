const React = require('react');
const SessionConstants = require('../constants/session_constants.js');
const Dispatcher = require('../dispatcher/dispatcher.js');
const SessionApiUtil = require('../util/session_api_util.js');


const SessionActions = {
  signUp(formData){
    SessionApiUtil.signUp(formData,
      this.receiveCurrentUser, this.receiveErrors
      );
  },

  logIn(formData){
    SessionApiUtil.logIn(formData,
      this.receiveCurrentUser, this.receiveErrors);
  },

  logOut() {
    SessionApiUtil.logOut(this.removeCurrentUser);
  },
  
  receiveCurrentUser(currentUser) {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: currentUser
    });
  },

  removeCurrentUser(){
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  },

  receiveErrors(authErrors) {
    Dispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_AUTH_ERRORS,
      authErrors: authErrors
    });
  },

  receiveCreationErrors(creationErrors) {

    Dispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_CREATION_ERRORS,
      creationErrors: creationErrors
    });
  },


}


module.exports = SessionActions;
