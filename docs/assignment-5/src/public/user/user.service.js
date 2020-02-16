(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {

  var service = this;
  service.user = "";

  service.setUser = function (user) {
    service.user = user;
    console.log("Now service user is ", user);
  };

  service.getUser = function () {
    return service.user;
  };

  service.getDish = function () {
    var path = ApiPath + '/menu_items/' + service.user.dish + '.json';
    console.log("Trying to retrieve dish ", service.user.dish, 'from', path);
    return $http.get(path).then(function (response) {
      console.log("Retrieved dish ", response.data);
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
