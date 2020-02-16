(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['UserService'];
function RegistrationController(UserService) {
  var reg = this;
  var ser = UserService;
  reg.user = ser.getUser();

  reg.submit = function () {
    reg.completed = true;
    ser.setUser(reg.user);
    ser.getDish().then(function (response) {
    	reg.user.dishdata = response;
    	console.log("Reg user dishdata is ",reg.user.dishdata)
    }, function (error) {
    	reg.user.dishdata = false;
    	console.log("Reg error is ",error);
    });
  };
}

})();
