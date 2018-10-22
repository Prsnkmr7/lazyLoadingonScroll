telliusBuild = angular.module('tellius-app', ['ui.router']);

// Route Provider Starts

telliusBuild.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('Home', {
            url: '/',
            templateUrl: 'Templates/home.html'
        })
        
});

// Home Controller logic

telliusBuild.controller('homeController', ['$scope', 'telliusAPIservice', function ($scope, tellius) {
    $scope.listItems = [];
    $scope.showItems = [];
    var count = 0;
    $scope.init = function () {
        tellius.listAllItems().success(function (response) {
            $scope.listItems = response; 
            $scope.loadMore();
        });
    };

    $scope.loadMore = function() {
        for (var i = count; i < count+40; i++) {
            $scope.showItems.push($scope.listItems[i]);
        }
        count = count + 40;
    };

    $scope.init();

}]);

// Factories

telliusBuild.factory('telliusAPIservice', function ($http) {

    var telliusAPI = {};

    telliusAPI.listAllItems = function () {
        return $http({
            method: 'GET',
            url: '../json/member.json'
        });
    }

    return telliusAPI;
});

// Directive 

telliusBuild.directive("whenScrolled", function(){
    return{  
      restrict: 'A',
      link: function(scope, elem, attrs){
      
        raw = elem[0];
        elem.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attrs.whenScrolled);
            }
        });
      }
    }
  });