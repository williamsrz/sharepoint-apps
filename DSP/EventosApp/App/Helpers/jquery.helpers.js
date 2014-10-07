﻿
// função para obter parametros da query string 
jQuery.extend({

    getQueryStringValues: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    getQueryStringValue: function (name) {
        return jQuery.getQueryStringValues()[name];
    }
});

jQuery.extend({

    getDate: function (date, pattern) {
        
        return moment(date).format(pattern);
    },

});