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
                }).fail(function() {
                    $('body').trigger('processStop');

                    self.setEmail('');
                    self.setPassword('');
                })
            }).catch(function() {
                customerData.set('messages', {
                    messages: [{
                        type: 'error',
                        text: self.loginValidationMessage
                    }]
                })
            })
        }
    })
});
