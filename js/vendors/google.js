'use strict';

var inherit = require('../utils').inherit,
    Vendor = require('./vendor').Vendor;

/**
 * @constructor
 */
var Google = function (options) {
    Google.superclass.constructor.call(this, options);

    this.name = 'google';
    this.title = 'Google';
    this.url = 'http://translate.google.com';
    this.langList = LANGUAGES;
};

inherit(Google, Vendor);

/** @const */
var LANGUAGES = {
    "auto" : "Auto detect",
    "af"   : "Afrikaans",
    "sq"   : "Albanian",
    "ar"   : "Arabic",
    "hy"   : "Armenian",
    "az"   : "Azerbaijani",
    "eu"   : "Basque",
    "be"   : "Belarusian",
    "bn"   : "Bengali",
    "bs"   : "Bosnian",
    "bg"   : "Bulgarian",
    "ca"   : "Catalan",
    "ceb"  : "Cebuano",
    "zh-CN": "Chinese",
    "hr"   : "Croatian",
    "cs"   : "Czech",
    "da"   : "Danish",
    "nl"   : "Dutch",
    "en"   : "English",
    "eo"   : "Esperanto",
    "et"   : "Estonian",
    "tl"   : "Filipino",
    "fi"   : "Finnish",
    "fr"   : "French",
    "gl"   : "Galician",
    "ka"   : "Georgian",
    "de"   : "German",
    "el"   : "Greek",
    "gu"   : "Gujarati",
    "ht"   : "Haitian Creole",
    "iw"   : "Hebrew",
    "hi"   : "Hindi",
    "hmn"  : "Hmong",
    "hu"   : "Hungarian",
    "is"   : "Icelandic",
    "id"   : "Indonesian",
    "ga"   : "Irish",
    "it"   : "Italian",
    "ja"   : "Japanese",
    "jw"   : "Javanese",
    "kn"   : "Kannada",
    "km"   : "Khmer",
    "ko"   : "Korean",
    "lo"   : "Lao",
    "la"   : "Latin",
    "lv"   : "Latvian",
    "lt"   : "Lithuanian",
    "mk"   : "Macedonian",
    "ms"   : "Malay",
    "mt"   : "Maltese",
    "mr"   : "Marathi",
    "no"   : "Norwegian",
    "fa"   : "Persian",
    "pl"   : "Polish",
    "pt"   : "Portuguese",
    "ro"   : "Romanian",
    "ru"   : "Russian",
    "sr"   : "Serbian",
    "sk"   : "Slovak",
    "sl"   : "Slovenian",
    "es"   : "Spanish",
    "sw"   : "Swahili",
    "sv"   : "Swedish",
    "ta"   : "Tamil",
    "te"   : "Telugu",
    "th"   : "Thai",
    "tr"   : "Turkish",
    "uk"   : "Ukrainian",
    "ur"   : "Urdu",
    "vi"   : "Vietnamese",
    "cy"   : "Welsh",
    "yi"   : "Yiddish"
};

exports.Google = Google;