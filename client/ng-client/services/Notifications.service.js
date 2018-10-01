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
        TOP_RIGHT: 'topRight',
        CENTER: 'center'
    };
    self.defaults = {
        timeout: 4000,
        layout: self.layouts.TOP_RIGHT,
        theme: 'bootstrap-v3',
    };

    self.notify = function (text, type, layout, isModal, timeout) {
        timeout = (timeout===undefined)? self.defaults.timeout : timeout;
        const notification = new Noty({
            modal: isModal,
            theme: self.defaults.theme,
            type: type || self.type.INFO,
            layout: layout || self.defaults.layout,
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

    /**
     * @param {string} text
     * @param {function} onConfirm
     * @param {function} onDecline
     * @param {function} onClose
     * @return {Noty}
     */
    self.confirmDialogWarning = function (text, onConfirm, onDecline, onClose) {
        const confirmDialog = new Noty({
            modal: true,
            theme: self.defaults.theme,
            type: self.types.WARNING,
            layout: self.layouts.CENTER,
            text: text,
            buttons: [
                Noty.button('Yes', 'btn btn-success btn-sm', function () {
                        onConfirm();
                        confirmDialog.close();
                    },
                    {id: 'confirmDialog', 'data-status': 'ok'}),
                Noty.button('No', 'btn btn-default btn-sm', function () {
                    onDecline();
                    confirmDialog.close();
                })
            ],
            callbacks: {
              onClose: onClose
            }
        });
        confirmDialog.show();
        return confirmDialog;
    };

}]);