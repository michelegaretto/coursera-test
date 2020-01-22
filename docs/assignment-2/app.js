(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.gettobuyItems();

  showList.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getboughtItems();
  
  showList.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuyitems = [{ name: "cookies", quantity: 10 },{ name: "cola", quantity: 1 },{ name: "sprite", quantity: 2 },{ name: "fanta", quantity: 1 },{ name: "beer", quantity: 10 }];
  var boughtitems = [];

  // console.log(service);
  
  service.moveItem = function (itemIndex) {
    // console.log("Trying to move item" + itemIndex)
    var item = tobuyitems[itemIndex];
    tobuyitems.splice(itemIndex, 1);
    boughtitems.push(item);
  };

  service.gettobuyItems = function () {
    return tobuyitems;
  };
  service.getboughtItems = function () {
    return boughtitems;
  };

}

})();
