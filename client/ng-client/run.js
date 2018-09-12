angular.module('basicMEAN')
.run(['$cookies', '$http', function ($cookies, $http) {
    setInterval(function checkForSessionTimeout() {
        let sessionExpirationCookie = $cookies.get('sid.active');
        if (sessionExpirationCookie) {
            let timeLeftInSeconds = (parseInt(sessionExpirationCookie) - Date.now())/1000;
            if (timeLeftInSeconds < 120) {
                // TODO: replace this code with a modal displaying a timer.
                if (confirm('You have less than 2 minutes left before you are logged out. ' +
                    'Do you want to continue this session?')) {
                    $http.get('/api/protected/ping').catch(reason => {
                        window.location.href = '/authenticate/logout';
                    });
                } else {
                    window.location.href = '/authenticate/logout';
                }
            }
        }
    }, 10000);
}]);
