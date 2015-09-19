var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.router',
	'firebase',
	'appControllers'
]).constant('FIREBASE_URL', 'https://[[app_name]].firebaseio.com');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("home");
        }
    });
}]);


myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home")

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
}]);
