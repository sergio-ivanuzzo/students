var myServices = angular.module("myServices", ["ngResource"]);

myServices.factory("Groups", ["$resource", 
    function($resource) {
		return $resource("/api/groups/:id/?", {}, {
			get: {
				method: "GET", 
				isArray: true
				},
			add: {
				method: "POST", 
				params: {name: '@name'},
				isArray: false
				},
			delete: {
				method: "DELETE", 
				params: {id: '@id'}, 
				isArray: false
				},
			update: {
				method: "PUT", 
				params: {id: '@id', name: '@name'}, 
				isArray: false
				}
		});
	}]);

// get students of current group

myServices.factory("Group", ["$resource", 
    function($resource) {
		return $resource("/api/students/:id/?", {}, {
			get: {
				method: "GET", 
				isArray: true
				},
			add: {
				method: "POST", 
				params: {
					id: '@id',
					group: '@group',
					name: '@name',
					birth_date: '@birth_date',
					card_code: '@card_code',
					captain: '@captain'
					},
				isArray: false
				},
			delete: {
				method: "DELETE",
				params: {id: '@id'},
				isArray: false
			},
			update: {
				method: "PUT",
				params: {
					id: '@id', 
					name: '@name', 
					birth_date: '@birth_date',
					card_code: '@card_code',
					captain: '@captain'
					},
				isArray: false
			}
		});
	}]);