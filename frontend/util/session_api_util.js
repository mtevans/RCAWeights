"use strict";

const SessionApiUtil = {
  logIn(user, success, errorCallback){
    $.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
      success: function(response){
        success(response);
      },
      error: function(response) {
        let errors = response.responseJSON;
        errorCallback(errors);

      }
    });
  },

  logOut(success){
    $.ajax({
			url: '/api/session',
			type: 'DELETE',
      success: function(response){
        success(response);
      },
      error: function(response) {
        let errors = response.responseJSON;
        SessionActions.receiveErrors(errors);
      }
    });
  },

  signUp(user, success, errorCallback){
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: {user},
      success: function (response){
        success(response)
      },
      error: function(response) {
        let errors = response.responseJSON;
        errorCallback(errors);
      }
    });
    },

}

module.exports = SessionApiUtil;
