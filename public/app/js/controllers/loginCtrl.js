'use strict';

angular.module('App')

    .controller('loginCtrl', ["$scope", "$http", "$sanitize", "$location", "$window", function ($scope, $http, $sanitize, $location, $window) {

        $scope.message = "hello from login controller";
        $scope.success = false;
        $scope.error = false;

        $scope.login = function () {

            var data = {
                userName: $sanitize($scope.username),
                password: $sanitize($scope.password)
            };

            $http({
                method: 'POST',
                url: '/users/authenticate',
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(data)
            }).success(function (data) {
                $scope.info = data.msg;
                $scope.token = data.token;
                $window.sessionStorage.token = data.token;
                $location.path("/home");
                $scope.success = true;
            }).error(function (data) {
                $scope.info = data.msg;
                $scope.error = true;
            })
        };


    }]);