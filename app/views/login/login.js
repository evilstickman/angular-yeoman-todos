'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */
    function LoginCtrl(Backand, $location, $cookieStore, TodoService) {
        var self = this;
        function init() {

          //add listner from parent
          if (window.addEventListener) {
            addEventListener("message", setToken, false)
          } else {
            attachEvent("onmessage", setToken)
          }
          //let parent know the iframe is ready
          window.parent.postMessage(["ready", ''], "*");
        }

        function setToken(event) {
          Backand.configuration.apiUrl = event.data.url;
          //Backand.token.put(event.data.auth);
          $cookieStore.put(Backand.configuration.tokenName,event.data.auth);
          Backand.setDefaultHeader(event.data.auth);
          TodoService.appName = event.data.appName;
          $location.path('/');
        }

        init();
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', ['Backand','$location','$http','TodoService', LoginCtrl]);
})();
