(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'jquery'], factory);
    }
    else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('underscore'),
            require('jquery')
        );
    }
    else {
        // Browser globals
        factory(_, $);
    }
}
(function (_, $) {

    Backbone.ComponentBinder = function (el) {
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this._el = el;
    };

    // Static setter for class level options
    Backbone.ComponentBinder.SetOptions = function (options) {
        Backbone.ComponentBinder.options = options;
    };

    Backbone.ComponentBinder.VERSION = '1.0.0';

    _.extend(Backbone.ComponentBinder.prototype, Backbone.Events, {

    });

}));
