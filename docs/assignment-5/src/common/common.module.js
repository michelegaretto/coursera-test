(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://mic-course5.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();



// https://www.davidchuschinabistro.com/images/L19.jpg
// https://mic-course5.herokuapp.com/