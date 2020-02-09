(function () {
'use strict';

angular.module('Data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath', '$q']
function MenuDataService($http, ApiBasePath, $q ) {
  var service = this;

  // // List of shopping items
  var items = [];
  var categoryitems = [];

  service.getAllCategories = function () {
    
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json"),
    }).then(function (result) {
      service.items = result.data;
      console.log("Items of service is ",service.items)
      return service.items;
    });

  };

  service.getCategory = function (index) {
    console.log("called getCategory with index ",index);

    var deferred = $q.defer();
    var result = service.items[index]; 
    deferred.resolve(result);
    return deferred.promise; 

  };

  service.getshortname = function (index) {
    console.log("called getshortname with index ",index);
    var result = service.items[index].short_name;
    console.log("result is ",result);
    return result;
  };

  service.getItemsForCategory = function(categoryShortName) {

    console.log("called getItemsForCategory with param ", categoryShortName);
    
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
    }).then(function (result) {
      service.categoryitems = result.data.menu_items;
      console.log("category items is ",service.categoryitems);
      return service.categoryitems;
    });

  };

}

})();
