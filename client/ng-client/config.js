angular.module('basicMEAN', ["ngRoute"])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/view1/view1",
            controller: "View1Ctrl as $ctrl"
        })
        .when("/view1", {
            templateUrl: "partials/view1/view1",
            controller: "View1Ctrl as $ctrl"
        })
        .when("/view2", {
            templateUrl: "partials/view2/view2",
            controller: "View2Ctrl as $ctrl"
        })
        .when("/search", {
            templateUrl: "partials/view-search/view-search",
            controller: "ViewSearchCtrl as $ctrl"
        })
        .when("/profile", {
            templateUrl: "partials/secure/profile/profile",
            controller: "ProfileCtrl as $ctrl"
        })
        .when("/view-protected", {
            templateUrl: "partials/secure/view-protected/view-protected",
            controller: "ViewProtectedCtrl as $ctrl"
        });
}]);

/*
To add a new view, follow these steps:
  - create a folder for the view in ng-client OR ng-client-protected
  - create a template .pug file for the view
  - create a controller for the view
  - preload the controller's js file in layout.pug
  - add a route for the view in the config above 
  - have a link to your view available somewhere
*/