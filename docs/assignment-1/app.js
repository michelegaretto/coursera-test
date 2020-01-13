(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.foodlist = "";
  $scope.message = "";

  $scope.checkfoodlist = function () {
    // console.log("foodlist is " + $scope.foodlist);
    var foodarray = $scope.foodlist.split(",");
    // console.log("foodarray is " + foodarray + " with first item " + foodarray[0] + " and len " + foodarray.length);
    if(foodarray.length <= 3) $scope.message = "Enjoy!"; else $scope.message = "Too much!";
    if($scope.foodlist=="") $scope.message = "Please enter data first";
  };
}

})();
