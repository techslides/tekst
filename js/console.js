(function () {
    "use strict";
    if (typeof this.console === 'undefined') {
        this.console = {};
        this.console.log = function () {
            if (typeof print === 'function') {
                print.apply(this, arguments);
            }
        };
    }
}).call(this);
