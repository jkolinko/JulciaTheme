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
            email: ko.observable(''),
            password: ko.observable(''),
            passwordConfirm: ko.observable(''),
            registerFormSelector: '#blog-register-form',
            registerSuccessMessage: $t('Registration was successful, you can log in.'),
            registerErrorMessage: $t('Registration failed, please try again.')
        },

        initialize: function() {
            this._super()
                .observe(['username', 'email', 'password', 'passwordConfirm']);

            return this;
        },

        getUsername: function() {
            return this.username();
        },

        setUsername: function(value) {
            this.username(value);
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

        getPasswordConfirm: function() {
            return this.passwordConfirm();
        },

        setPasswordConfirm: function(value) {
            this.passwordConfirm(value);
        },

        validateForm: function(form) {
            return form.validation() && form.validation('isValid');
        },

        sendForm: function() {
            var self = this;
            var registerForm = $(self.registerFormSelector);

            if(self.validateForm(registerForm)) {
                localStorage.setItem('username', self.getUsername());
                localStorage.setItem('email', self.getEmail());
                localStorage.setItem('password', self.getPassword());
                localStorage.setItem('passwordConfirm', self.getPasswordConfirm());

                self.setUsername('');
                self.setEmail('');
                self.setPassword('');
                self.setPasswordConfirm('');

                customerData.set('messages', {
                    messages: [{
                        type: 'success',
                        text: self.registerSuccessMessage
                    }]
                })
            } else {
                customerData.set('messages', {
                    messages: [{
                        type: 'error',
                        text: self.registerErrorMessage
                    }]
                })
            }
        }
    })
});
