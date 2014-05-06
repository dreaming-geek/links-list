
var scotchLink = angular.module('scotchLink', []);

var mainController = function($scope, $http) {
  $scope.formData = {};

  // when landing on page, get all links
  $http.get('/api/links')
    .success(function(data) {
      $scope.links = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createLink = function() {
    $http.post('/api/links', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; 
        $scope.links = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteLink = function(id) {
    $http.delete('/api/links/' + id)
      .success(function(data) {
        $scope.links = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
