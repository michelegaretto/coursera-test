(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['item','list']
function ItemsController(item,list) {
  var itemDetail = this;
  itemDetail.name = item.name;
  itemDetail.list = list;
  console.log("itemDetail: name = ",itemDetail.name);
  console.log("itemDetail: list = ",itemDetail.list);
  console.log("itemDetail: list is ",list);
}

})();
