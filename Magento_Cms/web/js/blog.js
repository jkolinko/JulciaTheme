define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Customer/js/customer-data'
], function($, Component, ko, customerData) {
    'use strict';

    return Component.extend({
        customer: customerData.get('customer'),

        initialize: function() {
            this._super();
        },

        getCustomer: function() {
            return this.customer();
        },

        isLoggedIn: function() {
            return !!(this.getCustomer().fullname && this.getCustomer().firstname);
        }
    })
});
