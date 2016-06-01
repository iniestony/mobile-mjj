mobileSJD.config(["$stateProvider", "base", function($stateProvider, base) {
    $stateProvider.state("welcome", {
        url: "/welcome",
        templateUrl: base + "/pages/welcome/welcome.html",
        controller: "welcomeCtrl"
    });
}])

.controller("welcomeCtrl", ["$scope", "$state", function($scope, $state) {
    $scope.next = function() {
        $state.go("login");
    };
}]);