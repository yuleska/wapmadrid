'use strict';

// Walkers controller

var walkersApp = angular.module('walkers');

walkersApp.controller('WalkersController', ['$scope', '$stateParams', 'Authentication', 'Walkers',
    function($scope, $stateParams, Authentication, Walkers) {
        this.authentication = Authentication;
        // Find a list of Walkers
        this.walkers = Walkers.query();
    }

]);
walkersApp.controller('WalkersCreateController', ['$scope', 'Walkers',
    function($scope, Walkers) {}

]);
walkersApp.controller('WalkersEditController', ['$scope', 'Walkers',
    function($scope, Walkers) {}

]);



// Create new Walker
/*$scope.create = function() {
    // Create new Walker object
    var walker = new Walkers({
        firstName: this.firstName,
        lastName: this.lastName,
        datebirth: this.datebirth,
        sex: this.sex
    });

    // Redirect after save
    walker.$save(function(response) {
        $location.path('walkers/' + response._id);

        // Clear form fields
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.datebirth = '';
        $scope.sex = '';
    }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
    });
};

// Remove existing Walker
$scope.remove = function(walker) {
    if (walker) {
        walker.$remove();

        for (var i in $scope.walkers) {
            if ($scope.walkers[i] === walker) {
                $scope.walkers.splice(i, 1);
            }
        }
    } else {
        $scope.walker.$remove(function() {
            $location.path('walkers');
        });
    }
};

// Update existing Walker
$scope.update = function() {
    var walker = $scope.walker;

    walker.$update(function() {
        $location.path('walkers/' + walker._id);
    }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
    });
};



// Find existing Walker
$scope.findOne = function() {
    $scope.walker = Walkers.get({
        walkerId: $stateParams.walkerId
    });
};*/
