(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserService','ApiPath'];
function InfoController(UserService,ApiPath) {
  var $ctrl = this;
  var ser = UserService;
  $ctrl.user = ser.getUser();
  $ctrl.basePath = ApiPath;
}

})();

