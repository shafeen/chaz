angular.module('basicMEAN')
.service('NotificationsService', ['$q', '$window', function ($q, $window) {
    const self = this;
    const Noty = $window.Noty;

    self.types = {
        INFO: 'info',
        ALERT: 'alert',
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error'
    };
    self.layouts = {
        TOP_RIGHT: 'topRight'
    };

    self.notify = function (text, type, layout, isModal, timeout) {
        timeout = (timeout===undefined)? 4000 : timeout;
        const notification = new Noty({
            modal: isModal,
            theme: 'bootstrap-v3',
            type: type || self.type.INFO,
            layout: layout || self.layouts.TOP_RIGHT,
            text: text,
            timeout: timeout,
            progressBar: true
        });
        notification.show();
    };

    self.notifyInfo = function (text) {
        self.notify(text, self.types.INFO);
    };

    self.notifyAlert = function (text) {
        self.notify(text, self.types.ALERT);
    };

    self.notifySuccess = function (text) {
        self.notify(text, self.types.SUCCESS);
    };

    self.notifyWarning = function (text) {
        text = "<strong style='color:black'>Warning!</strong><br>"+text;
        self.notify(text, self.types.WARNING);
    };

    self.notifyError = function (text) {
        self.notify(text, self.types.ERROR);
    };

}]);