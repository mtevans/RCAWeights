"use-strict";
const React = require('react');
const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const SessionConstants = require('../constants/session_constants.js');

let _authErrors = {};
let _currentUser = {};
let _creationErrors = [];


const SessionStore = new Store(Dispatcher);

const _logIn = function(user) {

  _currentUser = user;
  // when a user logs in, this clear the errors.
  _authErrors = [];
  SessionStore.__emitChange();
}

const _logOut = function(){
  _currentUser = {};
  _authErrors = {};
  SessionStore.__emitChange();
}

SessionStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _logIn(payload.user);

      break;
    case SessionConstants.LOGOUT:
      _logOut();

      break;
    case SessionConstants.RECEIVE_AUTH_ERRORS:
      _authErrors = payload.authErrors;
      this.__emitChange();
      break;
    case SessionConstants.RECEIVE_CREATION_ERRORS:
        _creationErrors = payload.creationErrors;
        this.__emitChange();
      break;
    }
};

SessionStore.findSubscriptionId = function(occasion_id){
  let returnId;
  _currentUser.subscriptions.forEach(subscription => {
    if(subscription.occasion_id === occasion_id){
      returnId = subscription.id;
    }
  });
  return returnId;
}

SessionStore.creationErrors = function(){
  return _creationErrors;
}


SessionStore.authErrors = function() {
  let array = [];
  for (var i in _authErrors) {
    if (_authErrors.hasOwnProperty(i)) {
      array.push(_authErrors[i]);
    }
  }
  return array;
};

SessionStore.clearAuthErrors = function(){
  _authErrors = {};
}


SessionStore.currentUser = function(){
  // Object.assign just creates duplicate. whole function acts as a reader fuction for _currentUser.
  return Object.assign({}, _currentUser);
}

SessionStore.isUserLoggedIn = function() {
  // the !! returns the same truthiness, but makes it purely a boolean of true or false.
  if (_currentUser === undefined){
    return false
  } else {  return !!_currentUser.id}
};


module.exports = SessionStore;
