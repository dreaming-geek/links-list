
scotchLink = angular.module 'scotchLink', []

mainController = ($scope, $http) ->
    $scope.formData = {}

    # get all links when landing on the page
    $http.get '/api/links'
        .success (data) ->
            $scope.links = data
            console.log data
        .error (data) ->
            console.log 'Error: ' + data

    # on form submit, the info is sent to node api
    $scope.createLink = ->
        $http.post '/api/links', $scope.formData
            .success (data) ->
                $scope.formData = {}
                $scope.links = data
                console.log data
            .error (data) ->
                console.log 'Error: ' + data

    # delete a link after checking it
    $scope.deleteLink = (id) ->
        $http.delete '/api/links' +id
        .success (data) ->
            $scope.links = data
            console.log data
        .error (data) ->
            console.log 'Error: ' + data


