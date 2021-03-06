define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Customer/js/customer-data',
    'mage/translate',
    'Magento_Customer/js/action/login',
    'mage/validation'
], function($, Component, ko, customerData, $t, loginAction) {
    'use strict';

    return Component.extend({
        defaults: {
            email: ko.observable(''),
            password: ko.observable(''),
            showErrorMessage: ko.observable(false),
            errorMessageContent: ko.observable(''),
            loginFormSelector: '#blog-login-form',
            loginValidationMessage: $t('Fill required fields.')
        },

        initialize: function() {
            this._super()
                .observe(['email', 'password']);

            return this;
        },

        getEmail: function() {
            return this.email();
        },

        setEmail: function(value) {
            this.email(value);
        },

        getPassword: function() {
            return this.password();
        },

        setPassword: function(value) {
            this.password(value);
        },

        validateForm: function() {
            var self = this;
            var loginForm = $(self.loginFormSelector);

            self.showErrorMessage(false);

            return new Promise(function(resolve, reject) {
                if(loginForm.validation('isValid') && self.getEmail() && self.getPassword()) {
                    resolve(true);
                }

                reject(false);
            });
        },

        sendForm: function() {
            var self = this;

            self.validateForm().then(function() {
                var user = {
                    username: self.getEmail(),
                    password: self.getPassword()
                };

                $('body').trigger('processStart');

                $.ajax({
                    contentType: 'application/json',
                    context: self.loginFormSelector,
                    data: JSON.stringify(user),
                    type: 'POST',
                    url: 'rest/default/V1/integration/customer/token'
                }).done(function() {
                    loginAction(user);
                }).fail(function(jqXHR) {
                    $('body').trigger('processStop');

                    self.errorMessageContent($t(jqXHR.responseJSON.message));
                    self.showErrorMessage(true);

                    self.setEmail('');
                    self.setPassword('');
                });
            }).catch(function() {
                self.customerMessage('error', self.loginValidationMessage);
            })
        },

        customerMessage: function(type, text) {
            customerData.set('messages', {
                messages: [{
                    type: type,
                    text: text
                }]
            })
        }
    })
});
