var myControllers = angular.module("myControllers", []);


// groups Controller

myControllers.controller('GroupsCtrl', ['$scope', '$cookies', 
                                        '$routeParams', 'Groups', '$rootScope',
                                        '$filter',

    function($scope, $cookies, $routeParams, Groups, $rootScope, $filter) {
		// flags
		// $scope.editForm = false;
		// error output
		$rootScope.errors = [];
		// select (get group list)
		$rootScope.groups = Groups.get(); 
		// insert
		$rootScope.addGroup = function() {
			
			var onSuccess = function(response) {
				$rootScope.errors["groups"] = [];
				$rootScope.group = {};
				$scope.groups.push(response);
			};
			var onError = function(error) {
				$rootScope.errors["groups"] = [];
				$rootScope.errors["groups"]["add"] = 
					error["data"]["name"].toString();
			};
			var data = {name: "group"};
			
			Groups.add(data, onSuccess, onError);
		}
		// delete
		$scope.deleteGroup = function(group, index) {
			
			var onSuccess = function(response) {
				$scope.groups.splice(index, 1);
			};
			var onError = function(error) {
				$scope.errors["groups"]["delete"] = 
					error["data"]["name"].toString();
			};
			var data = {id: group};
			
			Groups.delete(data, onSuccess, onError);
		}
		// update
		$scope.updateGroup = function(group) {

			var onSuccess = function(response) {
//				// flags
//				$scope.editForm = false;
//				// update scope
//				$scope.groups[group.index] = {
//						name: response.name, 
//						id: response.id
//						};
			};
			var onError = function(error) {
				$scope.errors["groups"] = [];
				$scope.errors["groups"]["update"] = error["data"]["name"].toString();
			};
			var data = {name: group.name, id: group.id};
			
			Groups.update(data, onSuccess, onError);
		}

	}

]);

// students Controller
myControllers.controller('StudentsCtrl', ['$scope', '$cookies', '$routeParams', 
                                          'Group', '$rootScope', '$filter',

    function($scope, $cookies, $routeParams, Group, $rootScope, $filter) {
		// flags
		$scope.studentList = false; 
		$scope.editForm = false;
		// error output
		$rootScope.errors = [];
		// select (get students of current group)
		$rootScope.getStudents = function(group) {
			$scope.studentList = true;
			$scope.editForm = false;
			
			var onSuccess = function(response) {
				$scope.students = response;
			};
			
			var data = {group: group.id};
			
			Group.get(data, onSuccess);
			// current group ID
			$scope.groupID = group.id;
			$scope.groupName = group.name;
		}
		// insert
		$rootScope.addStudent = function(student) {
			
			var id = $scope.groupID;
			
			var onSuccess = function(response) {
				$rootScope.errors["students"] = [];
				$rootScope.student = {};
				if(!$scope.students) {
					$scope.students = Group.get({group: groupID});
				}
	
				$scope.students.push(response);
			};
			var onError = function(error) {
				$rootScope.errors["students"] = [];
				$rootScope.errors["students"]["add"] = error["data"];
			};
			
			// student data
			data = {
				name: "name",
				group: "/api/groups/"+id+"/",
				birth_date: "2000-10-10",
				card_code: "card code",
				captain: "false"
			};

			Group.add(data, onSuccess, onError);
		}
		// delete
		$scope.deleteStudent = function(student, index) {
			
			var onSuccess = function(response) {
				$scope.students.splice(index, 1);
			};
			var onError = function(error) {
				$rootScope.errors["students"] = [];
				$scope.errors["students"]["delete"] = error["data"];
			};
			var data = {id: student.id};
			
			Group.delete(data, onSuccess, onError);
			
		}
		// update
		$scope.updateStudent = function(student, index) {
			
			var groupID = student.group;
			
			var datefilter = $filter('date');
			var birth_date = datefilter(student.birth_date, 'yyyy-MM-dd');
			
			var id = $scope.groupID;
			
			var onSuccess = function(response) {
				//$scope.editForm = false;
				response.group = groupID;
				$scope.students[index] = response;
				
				var students = $scope.students;

				Group.get({group: groupID}).$promise.then(function(result) {
					console.log('before',groupID);
					// if student moved to other group
					if(groupID != id) {
						// refreshing students list
						$scope.students = Group.get({group: id});
						id = groupID;
						students = result;
						console.log('result', result);
					}
					// reset old captain
					for(captain in students) {
						if(students[captain]["captain"]) {
							if(students[captain]["id"] != response.id) {
								var group = "/api/groups/" + id + "/";
								console.log('group',group);
								students[captain]["captain"] = false;
								students[captain]["group"] = group;
								Group.update(students[captain], function(r) {
									console.log('r', r);
									r.group = groupID;
									$scope.students[index] = r;
								});
							}
						}
					}	
					console.log('after',groupID);
					
				});

			};
			
			var onError = function(error) {
				console.log('error', error);
				$rootScope.errors["students"] = [];
				$rootScope.errors["students"]["update"] = error["data"];
			};
			
			student.captain = !!student.captain;
			student.group = "/api/groups/"+groupID+"/";
			var data = student;
			data.birth_date = birth_date;
			console.log('groupID', groupID);
			Group.update(data, onSuccess, onError);
			
		}

	}
]);