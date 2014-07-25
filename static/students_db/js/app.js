'use strict';

var myApp = angular.module('myApp', 
		['ngRoute', 'ngCookies', 
		 'myControllers', 'myServices', 'myDirectives',
		 'xeditable', 'ui.bootstrap']);

myApp.run(['$http', '$cookies', function ($http, $cookies) {
	$http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
}]);

myApp.config(['$routeProvider', '$interpolateProvider', 
              
    function($routeProvider, $interpolateProvider) {
		
		// angular data between {ng .. ng} tags
		$interpolateProvider.startSymbol('{ng');
		$interpolateProvider.endSymbol('ng}');
	
//		$routeProvider.
//
//		when("/students/:id/", {
//			templateUrl: "../static/students_db/partials/group.html",
//			controller: "StudentsCtrl"
//		}).
//		otherwise({
//			redirectTo: "/"
//		});
}]);