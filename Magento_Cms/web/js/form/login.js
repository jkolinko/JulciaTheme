define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Customer/js/customer-data',
    'mage/translate',
    'Magento_Ui/js/view/messages',
    'mage/validation'
], function($, Component, ko, customerData, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            username: ko.observable(''),
            password: ko.observable(''),
            loginFormSelector: '#blog-login-form',
            loginValidationMessage: $t('Fill required fields.'),
            loginErrorMessage: $t('Incorrect login data, please try again.')
        },

        initialize: function() {
            this._super()
                .observe(['username', 'password']);

            localStorage.setItem('loggedIn', 'false');

            return this;
        },

        getUsername: function() {
            return this.username();
        },

        setUsername: function(value) {
            this.username(value);
        },

        getPassword: function() {
            return this.password();
        },

        setPassword: function(value) {
            this.password(value);
        },

        validateForm: function(form) {
            return form.validation() && form.validation('isValid');
        },

        sendForm: function() {
            var self = this;
            var loginForm = $(self.loginFormSelector);

            if(self.validateForm(loginForm)) {
                var username = self.getUsername();
                var password = self.getPassword();

                var usernameStored = localStorage.getItem('username');
                var passwordStored = localStorage.getItem('password');

                if(username === usernameStored && password === passwordStored) {
                    localStorage.setItem('loggedIn', 'true');
                }  else {
                    customerData.set('messages', {
                        messages: [{
                            type: 'error',
                            text: self.loginErrorMessage
                        }]
                    })
                }
            } else {
                customerData.set('messages', {
                    messages: [{
                        type: 'error',
                        text: self.loginValidationMessage
                    }]
                })
            }
        }
    })
});
