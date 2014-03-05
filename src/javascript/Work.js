/* src/javascript/Work.js */

/*
 * Written by Kyle Dinh, 2014. 
 */
(function () { 

    function Work(controlStr, sampleStr, wordLength) {
        this.name = "";
        this.control = controlStr || " ";
        this.sampler = sampleStr || " ";
        this.word = wordLength || 6;
        this.curPointer = 0;    
        this.len = this.control.length;
        this.mutations = [];
        this.DEBUG = false;
    }

    Work.prototype.debug = function (msg) {
        if (this.DEBUG) { console.log(msg); }
    };

    Work.prototype.incPointer = function (i) {
        var n = i || 1;
        this.curPointer += n;
    };

    Work.prototype.alter = function (pos) {
        if ((pos + 2) > this.len) { return "MUTATION"; } 
        if (this.control[pos+1] === this.sampler[pos]) { return "BLANK"; }
        return "MUTATION";
    };

    // Simple algorithm for now, needs more work 
    Work.prototype.align  = function () {
        for (var i = 0; this.curPointer < this.len; i++) {
            if (this.control[i] === this.sampler[i]) {
                this.debug(i + " " + this.control[i] + " - " + this.sampler[i]);
            }
            if (this.control[i] !== this.sampler[i]) {
                var action = this.alter(i); 
                if (action === "BLANK") { this.insert(i, " "); }
                var mutation = {}; 
                mutation[i] = action;
                this.mutations.push(mutation);
                this.debug(action + " " + this.control[i] + " : " + this.sampler[i]);
            }
            this.curPointer++;
        } 
    };

    Work.prototype.insert = function (pos, str) {
        var place = str || " ";
        var head = "" + this.sampler.slice(0, pos);
        var tail = "" + this.sampler.slice(pos, this.sampler.length); 
        this.sampler = head + place + tail;
    };

    Work.prototype.printAtIndex = function (i) {
        this.printPair(this.control[i], this.sampler[i]);
    };

    Work.prototype.printPair = function (x, y) {
        var str = "";
        if (typeof y === 'undefined') { str = x + " - ."; }
        if (x === y) { str = x + " - " + y; }
        if (x !== y) { str = x + " * " + y; }
        if (y === " ") { str = x + " *  "; }
        console.log(str);
    };

    Work.prototype.report = function () {
        var obj = {
	   name: this.name,
           length: this.len,
           mutations: this.mutations
        };
        return JSON.stringify(obj);
    }

    // Nodejs export
    if (typeof exports !== 'undefined') {
        exports.Work = Work;
    } else {
        this.Work = Work;  
    }

})();

/* Work.js built Tue Mar  4 05:18:52 PST 2014 -- kyledinh */ 
