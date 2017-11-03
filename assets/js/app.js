(function() {
  angular.module('todo', ['ui.router', 'ngMaterial', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
      
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('/', {
          url: '/',
          templateUrl: 'assets/views/dashboard.html',
          controller: 'mainCtrl'
        });

       //$locationProvider.html5Mode(true);


      
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('red');

      

}])
    .filter('days', function () {
  return function (timestamp) {
    var oneDay = 24*60*60*1000;
    var today = new Date();
    var diffDays = Math.round(Math.abs((today.getTime() - timestamp)/(oneDay)));
    var day = "";
    if(diffDays === 0){
      day = "today";
    }
    else if(diffDays === 1){
      day = "yesterday";
    }
    else{
      day = diffDays + " days ago."
    }
     
    return day;
    
    
  };
});;
})();
