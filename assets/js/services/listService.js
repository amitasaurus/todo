	(function() {
		angular.module('todo')
			.factory('listService', ['$http', function($http) {
				function getTodos() {
					var todos = [];
					return $http.get('todo/assets/js/todos.json')
						 .then(function(response){
						 	return response.data;
						 });
				}
				return {
					getTodos: getTodos
				};
		}]);
	})();