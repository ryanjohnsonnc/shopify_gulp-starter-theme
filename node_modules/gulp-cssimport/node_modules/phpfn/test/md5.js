var wru = require("wru");
var phpfn = require("..");
var basename = require("path").basename;

var tests = [];
tests[tests.length] = {
	name: basename(__filename),
	test: function() {
		var fn = phpfn.get("md5");
		wru.assert(typeof fn === "function");
		wru.assert("md5('1')", fn("1") === "c4ca4238a0b923820dcc509a6f75849b");
	}
};

if (module.parent === null || process.argv[0].indexOf("electron") != -1) {
	wru.test(tests);
} else {
	module.exports = tests;	
}