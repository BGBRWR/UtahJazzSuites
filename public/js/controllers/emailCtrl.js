angular.module('jazz').controller('emailCtrl', function($scope, emailService) {

    $scope.sendEmail = function(user) {
        emailService.email(user);
        swal('Email sent!', 'We will contact you soon!', 'success')
    };
});
