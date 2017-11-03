(function() {
	angular.module('todo')
		.controller('mainCtrl', ['$scope', '$mdDialog', 'listService', '$rootScope', '$mdToast' , function($scope, $mdDialog, listService, $rootScope, $mdToast) {
			console.log('mainCtrl');

			if(localStorage.todos === undefined || JSON.parse(localStorage.todos).length === 0){
				listService.getTodos()
				.then(function(response) {
					console.log(response);
					localStorage.todos = JSON.stringify(response);
					$rootScope.todos = JSON.parse(localStorage.todos);
					console.log('getting from http call');
				});
			}
			else{
				$rootScope.todos = JSON.parse(localStorage.todos);
				console.log('getting from storage');
			}
			

			var dateTime = new Date();
			$scope.date = dateTime.toLocaleDateString('en-GB');
			var time = dateTime.getHours();
			if (time >= 12 && time < 18) {
				$scope.time = "day";
				$scope.greeting = "Good Afternoon";
			} else if (time >= 18 && time < 21) {
				$scope.time = "evening";
				$scope.greeting = "Good Evening";
			} else if (time >= 5 && time < 12) {
				$scope.time = "morning";
				$scope.greeting = "Good Morning";
			} else {
				$scope.time = "night";
				$scope.greeting = "Good Night";
			}

			$scope.add = function(ev) {
				$mdDialog.show({
					controller: addNoteController,
					templateUrl: 'todo/assets/views/addNote.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true
				})

				function addNoteController($scope, $mdDialog, $rootScope) {
					$scope.addTodo = function(todo) {
						var d = new Date();
						var todo = todo;
						todo.timestamp = d.getTime();
						todo.status = 'pending';
						$rootScope.todos.push(todo);
						localStorage.todos = JSON.stringify($rootScope.todos);
						$mdDialog.hide();

					}
				}
			}
			$scope.edit = function(ev,i) {
				$rootScope.index = i;
				$mdDialog.show({
					controller: editNoteController,
					templateUrl: 'todo/assets/views/editNote.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true
				})
				function editNoteController($scope, $mdDialog, $rootScope){
					var index = $rootScope.index;
					$scope.todo = $rootScope.todos[index];
					$scope.saveTodo = function(todo){
						$rootScope.todos.splice(index,1,todo);
						localStorage.todos = JSON.stringify($rootScope.todos);
						$mdDialog.hide();
					}
				}
			}
			$scope.complete = function(index){
				var todo = $rootScope.todos[index];
				todo.status = 'completed';
				$rootScope.todos.splice(index,1);
				$rootScope.todos.push(todo);
				localStorage.todos = JSON.stringify($rootScope.todos);
			}
			$scope.delete = function(index){
				$rootScope.todos.splice(index,1);
				localStorage.todos = JSON.stringify($rootScope.todos);
				$mdToast.showSimple("Todo Deleted");
			}



		}]);
})();