angular.module('jazz').controller('emailCtrl', function($scope, emailService) {

    $scope.sendEmail = function(user) {
        emailService.email(user);
    };
});
