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
            tracks: {
                username: true,
                password: true
            },
            loginFormSelector: '#blog-login-form',
            loginValidationMessage: $t('Fill required fields.'),
            loginErrorMessage: $t('Incorrect login data, please try again.')
        },

        initialize: function() {
            this._super();

            return this;
        },

        getUsername: function() {
            return this.username;
        },

        setUsername: function(value) {
            this.username(value);
        },

        getPassword: function() {
            return this.password;
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

            self.validateForm(loginForm);
        }
    })
});
