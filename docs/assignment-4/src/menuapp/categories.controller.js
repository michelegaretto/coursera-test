(function () {
'use strict';

angular.module('Data')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var mainList = this;
  mainList.items = items;
  console.log("categories controller: items is ", mainList.items)
}

})();
