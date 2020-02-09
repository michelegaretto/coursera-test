(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/mainlist.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

 
  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'ItemsController as itemDetail',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getCategory($stateParams.itemId);
            }],
      list: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {

              var short = MenuDataService.getshortname($stateParams.itemId);
              console.log("short is ",short);
              return MenuDataService.getItemsForCategory(short);

            }]
    }
  });

}

})();
