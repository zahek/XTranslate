'use strict';

var UTILS = require('../utils'),
    inherit = UTILS.inherit,
    UIComponent = require('../ui/ui_component').UIComponent;

/**
 * @constructor
 */
var UserInputContainer = function (options) {
    UserInputContainer.superclass.constructor.call(this, options);

    this.createDom();
    this.bindEvents();
};

inherit(UserInputContainer, UIComponent);

/** @private */
UserInputContainer.prototype.createDom = function () {
    this.$container.addClass('userInputContainer');

    this.$langPairHolder = $('<div class="langPairHolder"/>').appendTo(this.$container);
    this.$text = $('<textarea class="text"/>').attr('placeholder', __(63)).appendTo(this.$container);
    this.$results = $('<div class="results"/>').appendTo(this.$container);
};

/** @private */
UserInputContainer.prototype.bindEvents = function () {
    this.$text.on('input', UTILS.debounce(this.onInput.bind(this), 250));
};

/** @private */
UserInputContainer.prototype.onInput = function () {

};

UserInputContainer.prototype.show = function () {
    UserInputContainer.superclass.show.apply(this, arguments);
    APP.data('langPair').$container.appendTo(this.$langPairHolder);
    this.$text.focus();
};

exports.UserInputContainer = UserInputContainer;