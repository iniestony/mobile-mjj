mobileSJD.directive("sjdTopNavBar", ["base", function(base) {
    return {
        restrict: "E",
        scope: {
            prevState: "@",
            prevText: "@",
            nextState: "@",
            nextText: "@",
            navTitle: "@"
        },
        link: function(scope, element, attrs) {

        },
        controller: ["$scope", "$state", function($scope, $state) {
            $scope.next = function() {
                $state.go($scope.nextState);
            };

            $scope.prev = function() {
                $state.go($scope.prevState);
            };
        }],
        templateUrl: base + "/widgets/sjdTopNavBar/sjdTopNavBar.html"
    };
}]);