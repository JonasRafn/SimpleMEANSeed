'use strict';

angular.module('App')

    .controller('signupCtrl', ["$scope", "$http", "$sanitize", function ($scope, $http, $sanitize) {

        $scope.message = "hello from signup controller";
        $scope.success = false;
        $scope.error = false;

        $scope.signUp = function () {

            var data = {
                userName: $sanitize($scope.username),
                password: $sanitize($scope.password)
            };

            $http({
                method: 'POST',
                url: 'users/signup',
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(data)
            }).success(function (data) {
                $scope.info = data.msg;
                $scope.success = true;
            }).error(function (data) {
                $scope.info = data.msg;
                $scope.error = true;
            })
        };


    }]);