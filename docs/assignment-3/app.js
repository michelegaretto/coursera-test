(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundList', FoundListDirective);

function FoundListDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    // template: '<div class="foundlist"><ol><li ng-repeat="item in list.found">{{ item.name }} , {{ item.short_name }} , {{ item.description }} <button ng-click="list.onRemove({index: $index});">Do not want this one!</button></li></ol><div class="error" ng-if="list.nothingfound()">Nothing found</div></div>',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundListDirectiveController() {
  var list = this;
  
  list.nothingfound = function () {
    if (list.found === undefined) return false;
    if (list.found.length == 0) return true; 
    return false;      
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  
  menu.removeItem = function (itemIndex) {
    // console.log("called removeitem ", itemIndex);
    menu.found.splice(itemIndex, 1);
  };
        
  menu.searchItems = function () {
    // console.log("search term is ",menu.searchTerm);
    if (menu.searchTerm && menu.searchTerm != "") {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function (response) {
        menu.found = response;
        // console.log("found items: ",response);
      })
    } else {
      menu.found = []
    }
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      
      // process result and only keep items that match
      var allItems = result.data.menu_items;
      var foundItems = []
      
      for (var i = 0; i < allItems.length; i++) {
        var name = allItems[i].description;
        if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(allItems[i]);
        }
      }

      // console.log("foundItems is ",foundItems);

      // return processed items
      return foundItems;

    });

  };

}

})();
