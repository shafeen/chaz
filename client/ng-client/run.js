angular.module('basicMEAN')
.run(['$cookies', '$http', 'NotificationsService', function ($cookies, $http, NotificationsService) {
    setInterval(function checkForSessionTimeout() {
        let sessionExpirationCookie = $cookies.get('sid.active');
        if (sessionExpirationCookie) {
            let timeLeftInSeconds = (parseInt(sessionExpirationCookie) - Date.now())/1000;
            if (timeLeftInSeconds < 120) {
                let text = '<strong style="color:black">Warning!</strong><br>' +
                    'You have less than 2 minutes left before you are logged out.<br>' +
                    'Do you want to continue this session?';
                NotificationsService.confirmDialogWarning(text, () => {
                    console.log('Attempting to continue session.');
                    $http.get('/api/protected/ping').catch(reason => {
                        window.location.href = '/authenticate/logout';
                    });
                }, () => {
                    console.log('Logging out from session.');
                    window.location.href = '/authenticate/logout';
                }, () => {
                    console.log('Dismissing warning.');
                    $http.get('/api/protected/ping').catch(reason => {
                        window.location.href = '/authenticate/logout';
                    });
                });
            }
        }
    }, 10000);
}]);
