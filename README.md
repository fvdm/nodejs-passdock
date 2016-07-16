passdock
========

Node.js module for [PassDock](http://passdock.com/) API methods for iOS Wallet


* [Node.js](https://nodejs.org)
* [Package on npm](https://www.npmjs.com/package/passdock)
* [Passdock API](https://api.passdock.com)
* [API documentation](https://api.passdock.com/doc)


Installation
------------

`npm install passdock`


Example
-------

```js
var passdock = require ('passdock') ({
  token: 'authentication token'
});

passdock.templates.list (console.log);
```


Methods
-------

Each method takes a `callback` function to process the result. This callback receives two parameters: `result` and `error`. When an error occurs the `error` param is an **object** and `result` is the received unparsed text. When all is good `error` is **false** and `result` is the parsed JSON data.

**Warning:** the `error` object may contain your API-key! Make sure this won't go public.

```js
function callback (err, data) {
	if (err) {
		console.log (err);
		return;
	}

  console.log (data);
}
```


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


Author
------

[Franklin van de Meent](https://frankl.in)
