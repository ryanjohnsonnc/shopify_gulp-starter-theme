"use strict";
var vm = require("vm");
var fs = require("fs");
var phpFunctions = {};
var functions = require("./pathmap.json");

function getSync(name) {
	var fn = phpFunctions[name];
	if (!fn) {
		var funcpath = functions[name];
		var bodypath = require.resolve("phpjs/functions/" + funcpath);
		var body = fs.readFileSync(bodypath, {
			encoding: "utf8"
		});
		vm.runInNewContext(body, phpFunctions);
		fn = phpFunctions[name];
	}
	return fn;
}

module.exports = function(name, callback) {
	
	if (arguments.length == 1) {
		return getSync(name);
	}
	
	var url = functions[name];

	var fileGetContents = function(path, next) {
		var bodypath = require.resolve("phpjs/functions/" + path);
		fs.readFile(bodypath, {
			encoding: "utf8"
		}, next);
	};

	if (!url) {
		var format = require("util").format;
		throw new Error(format("Unknown function '%s'.", name));
	}
	var fn = phpFunctions[name];
	if (fn) {
		callback(null, fn);
		return;
	}
	fileGetContents(url, function(error, body) {
		if (error) {
			return callback(error);
		}
		vm.runInNewContext(body, phpFunctions);
		var fn = phpFunctions[name];
		if (typeof fn === "function") {
			callback(null, fn);
		} else {
			callback(new Error(format("'%s' is not a function.", name)));
		}
	});
};