(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'jquery', 'backbone', 'Backbone.ModelBinder'], factory);
    }
    else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('underscore'),
            require('jquery'),
            require('backbone')
        );
    }
    else {
        // Browser globals
        factory(_, $, Backbone);
    }
}
(function (_, $, Backbone) {

    if (!Backbone) {
        throw 'Please include Backbone.js before Backbone.ModelBinder.js';
    }

    Backbone.ComponentBinder = function (el) {
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this._el = el;
    };

    var _componentBinders = Backbone.ComponentBinder._componentBinders = [];

    // static function to add component binders to the "registry" of component binders
    Backbone.ComponentBinder.AddComponentBinder = function (componentBinder) {
        if (componentBinder.prototype instanceof Backbone.ComponentBinder) {
            _componentBinders.push(componentBinder);
        }
    };

    // static function to get a component binder instance that is responsible for the given jquery element
    Backbone.ComponentBinder.GetComponentBinder = function (el) {
        var componentBinderCount;
        for (componentBinderCount = 0; componentBinderCount < _componentBinders.length; componentBinderCount++) {
            if (_componentBinders[componentBinderCount].isResponsibleFor(el)) {
                return _componentBinders[componentBinderCount];
            }
        }
        return undefined;
    };

    Backbone.ComponentBinder.VERSION = '1.0.0';

    _.extend(Backbone.ComponentBinder.prototype, Backbone.Events, {
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () {
        },
        isResponsibleFor: function (el) {
            return false;
        },
        getValue: function () {
            return this.el.val();
        },
        setValue: function (value) {
            this.el.val(value);
        },
        enable: function () {
            this.el.prop('disabled', false);
        },
        disable: function () {
            this.el.prop('disabled', true);
        }
    });

    // Helpers
    // -------

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    Backbone.ComponentBinder.extend = extend;
}));
