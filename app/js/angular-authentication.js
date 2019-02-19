// Authentication module for AngularJS
// Copyright (C) 2013 Qloo Inc., Michael Diolosa <michael.diolosa@gmail.com>
// License: MIT

/* global angular:true, browser: true */

(function () {
  'use strict';

  // Private variable for storing identity information.
  var _identity = {},

    // Stores whether the user has been authenticated
    _authenticated = false;

  // authentication
  // ==============
  // Provides the interface for conversing with the authentication API and
  // generating a principal from the authenticated entity's information.
  angular.module('authentication', [])

    // Properties
    // ----------
    // Version
    .constant('version', '1.0.4')

    // principal
    // ---------
    // The authenticated entity, it's identity object is dynamically
    // generated when authentication is successful. It's properties are
    // generated by looping through the data that was returned by the
    // authentication API using the white list of property values that can
    // be configured through `authorityProvider.identityKeys`.
    .factory('principal', function () {
      return {
        identity: function () { return _identity; },
        isAuthenticated: function () { return _authenticated; }
      };
    })

    // authority
    // ---------
    // The `authority` provides a means for authentication
    .provider('authority', function () {
      // An object that describes how the keys from the API's result are to be
      // translated into the identity object. The key of this object is the
      // key that is returned from the `authorize` method's data; the value of
      // this key is the key that it will exist as on the object that's
      // returned from `principal.identity()`.
      //
      // An easier way to explain this is through some code:
      //
      // We will assume that the authentication API returns a JSON object on
      // success that contains the following value:
      //
      // {
      // "username": "mbrio",
      // "id:": 1001
      // "date": 1363784671793
      // }
      //
      // With the default values set to identityKeys then the object
      // returned from `principal.identity()` would be structured as:
      //
      // {
      // name: function () { return "mbrio"; },
      // id: function () { return 1001; }
      // }
      //
      // Which then could be used in an angular template if set to a `$scope`
      // property:
      //
      // $scope.user = principal // In the controller
      //
      // {{user.identity().name}} // In the template
      //
      // As you see the `username` property on the JSON data was interpolated
      // to just `name`, `id` stayed the same, and `date` was ignored.
      this.identityKeys = {
        username: 'name',
        id: 'id'
      };

      // Define the provider's instance
      this.$get = ['$rootScope',
        function ($rootScope) {
          var idKeys = this.identityKeys;

          return {
            // `authorize` is meant to be called from a controller once the
            // user has been authenticated by an external API. It wires up the
            // `principal.identity()` object and then broadcasts the
            // `authority-authorized` event from the `$rootScope`
            authorize: function (data) {
              var key, propertyFn;
              _authenticated = true;

              // Fill our `principal.identity()` object with getter methods
              // to protect the underlying values.
              propertyFn = function (k) {
                var value = idKeys[k],
                  retval = data[k],
                  ident = {};

                _identity[value] = function () { return retval; };
              };

              for (key in idKeys) {
                if (idKeys.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                  propertyFn(key);
                }
              }

              // Broadcast the authorized event
              $rootScope.$broadcast('event:authority-authorized');
            },

            // `deauthorize` resets the `principal` and `identity`
            deauthorize: function () {
              var key, value;
              _authenticated = false;

              // Delete all the properties of `_identity` for a clean slate.
              for (key in idKeys) {
                value = idKeys[key];
                if (idKeys.hasOwnProperty(key) && _identity.hasOwnProperty(value)) {
                  delete _identity[value];
                }
              }

              // Broadcast the deauthorized event
              $rootScope.$broadcast('event:authority-deauthorized');
            }
          };
        }];
    });
}());