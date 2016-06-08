var wru = require("wru");
var phpfn = require("..");
var basename = require("path").basename;

var tests = [];
tests[tests.length] = {
	name: basename(__filename),
	test: function() {
		var fn = phpfn("ucfirst");
		wru.assert(typeof fn === "function");
		wru.assert("ucfirst('abc')", fn("abc") === "Abc");
	}
};

if (module.parent === null || process.argv[0].indexOf("electron") != -1) {
	wru.test(tests);
} else {
	module.exports = tests;	
}