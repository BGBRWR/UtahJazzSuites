angular.module("jazz").service("emailService", function($http) {
    this.email = function(user) {
        return $http.post("/contact", user).then(function(httpResponse) {
            console.log('response:', httpResponse);
            if (httpResponse.status === 200) {
              return swal('Email sent!', 'We will contact you soon!', 'success');
            }
        });
    }
});
