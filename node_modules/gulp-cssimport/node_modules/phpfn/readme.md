phpfn
-----
Get selected function from phpjs.org.

USAGE
-----
```js
var phpfn = require("phpfn");
phpfn("trim", function(error, trim) {
	if (error) throw error;
	console.log(trim("xABCx", "x")); // ABC
});
```
#### Synchronous version
```js
var phpfn = require("phpfn");
var ucfirst = phpfn("ucfirst");
console.log(ucfirst("abc")); // Abc
```

TODO
----
- dependent functions