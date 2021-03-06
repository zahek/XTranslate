'use strict';

var UTILS = require('../utils'),
    inherit = require('../utils').inherit,
    EventDriven = require('../events').EventDriven;

/**
 * Base class for all translation services
 * @constructor
 */
var Vendor = function () {
    Vendor.superclass.constructor.call(this);

    this.autoDetect = 'auto';
    this.urlTextToSpeech = '';
    this.langList = {};
    this.lastResData = {};
    this.lastReqData = {text: '', langFrom: '', langTo: ''};
};

inherit(Vendor, EventDriven);

Vendor.prototype.translateText = function (text) {
    this.swapped = false;
    if (this.request && this.request.state() === 'pending') this.abort();
    return this.loadData({text: text});
};

/**
 * Create ajax request with provided arguments for getting translation data
 * @param {{langFrom: String=, langTo: String=, text: String}} data
 * @return {jQuery.Deferred}
 */
Vendor.prototype.makeRequest = function (data) {
    // must be overridden!
    return (this.request = $.ajax(data));
};

/** @protected */
Vendor.prototype.abort = function () {
    this.request.abort();
};

/** @protected */
Vendor.prototype.loadData = function (data) {
    var lastReq = this.lastReqData;
    data = $.extend(this.getLang(), data);

    if (this.lastResData.resolved &&
        data.text === lastReq.text &&
        data.langFrom == lastReq.langFrom &&
        data.langTo == lastReq.langTo) {
        return $.Deferred().resolve(this.lastResData);
    }

    this.lastResData.resolved = false;
    return this.makeRequest($.extend(this.lastReqData, data))
        .then(this.parseData.bind(this))
        .then(this.swapLang.bind(this));
};

/**
 * Parse response from server and convert the data to internal format for the app views
 * @see VendorDataView.parseData for the details about possible data returning from vendor
 * @param {Object} response
 */
Vendor.prototype.parseData = function (response) {
    var ttsEnabled = !!this.getAudioUrl(this.lastReqData.text, response.langSource);
    return (this.lastResData = $.extend({
        resolved  : true,
        ttsEnabled: ttsEnabled,
        vendor    : this.name,
        sourceText: this.lastReqData.text
    }, response));
};

/** @protected */
Vendor.prototype.swapLang = function (parsedData) {
    if (this.swapped) return parsedData;

    var langPair = this.getLang(),
        langFrom = langPair.langFrom,
        langTo = langPair.langTo,
        langSource = parsedData.langSource,
        langDetected = parsedData.langDetected;

    if (langDetected && langDetected !== langSource && langFrom !== this.autoDetect) {
        this.swapped = true;
        return this.loadData({
            langFrom: langDetected,
            langTo  : langDetected !== langFrom ? langFrom : langTo
        });
    }
    return parsedData;
};

Vendor.prototype.playText = function (text) {
    text = text || this.lastReqData.text;
    var lang = this.lastResData.langSource || this.lastReqData.langFrom || this.getLang().langFrom;
    if (!this.urlTextToSpeech || !text) return;
    var url = this.getAudioUrl(text, lang);
    if (url) APP.extension.playAudio(url);
};

Vendor.prototype.stopPlaying = function () {
    APP.extension.stopAudio();
};

/**
 * Get url of text-to-speech audio file or stream
 * @param {string} text
 * @param {string} lang
 * @return {string}
 */
Vendor.prototype.getAudioUrl = function (text, lang) {
    text = encodeURIComponent(text);
    lang = lang !== this.autoDetect ? lang : '';
    return UTILS.sprintf(this.urlTextToSpeech, text, lang);
};

/**
 * Get current selected languages
 * @return {{langFrom: String, langTo: String}}
 */
Vendor.prototype.getLang = function () {
    var vendorBlock = APP.get('settingsContainer.vendorBlock');
    return {
        langFrom: vendorBlock.langFrom,
        langTo  : vendorBlock.langTo
    };
};

exports.Vendor = Vendor;