'use strict';

var App = angular.module('App')

    .controller('homeCtrl', ["$scope", "$http", "$window", "$location", function ($scope, $http, $window, $location) {

        $scope.message = "hello from home controller";
        $scope.error = false;

        $scope.logout = function () {
            delete $window.sessionStorage.token;
            $location.path("/");
        };

        $http.get("api/names/")
            .success(function (response) {
                $scope.names = response;
            }).error(function (response) {
            $scope.info = response.msg;
            $scope.error = true;
        });

        $http.get("api/hellos/")
            .success(function (response) {
                $scope.hellos = response;
            }).error(function (response) {
            $scope.info = response.msg;
            $scope.error = true;
        });


    }]);