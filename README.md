nodejs-passdock
===============

Node.js module for [PassDock](http://passdock.com/) API methods for iOS 6 PassBook.

API docs: <https://api.passdock.com/doc>


BETA notice
===========

This module code and the consulting API are in an early development stage. The methods may produced unexpected results.


Installation
============

#### From NPM registry

	$ npm install passdock

```js
var passdock = require('passdock')
```


#### From source at Github

	$ git clone https://github.com/fvdm/nodejs-passdock
	
```js
var passdock = require('/path/to/nodejs-passdock')
```


Module usage
============

```js
var passdock = require('passdock')

passdock.api.token = 'your authentication token'

passdock.templates.list( console.log )
```

`api.token` is required to authenticate your API calls.


Methods
=======

Each method takes a `callback` function to process the result. This callback receives two parameters: `result` and `error`. When an error occurs the `error` param is an **object** and `result` is the received unparsed text. When all is good `error` is **false** and `result` is the parsed JSON data.

**Warning:** the `error` object may contain your API-key! Make sure this won't go public.

```js
function callback( result, error ) {
	if( error ) {
		console.log( 'API trouble: '+ error.reason )
	} else {
		console.log( result )
	}
}
```


Templates
---------

### templates.list ( callback )

List all templates in your account.

```js
passdock.templates.list( function( templates ) {
	templates.forEach( function( template ) {
		console.log( template.title )
	})
})
```


### templates.show ( templateID, callback )

Get one template identified with `templateID`.

```js
passdock.templates.show( 2309, function( template ) {
	console.log( template.title +' - '+ template.bar.message )
})
```


### templates.delete ( templateID, callback )

Delete a template `templateID` from your account.

```js
passdock.templates.delete( 2309, console.log )
```


Passes
------


### passes.list ( templateID, callback )

List all passes using template `templateID` in your account.

```js
passdock.passes.list( 2309, console.log )
```


### passes.show ( templateID, passID, callback )

Get one pass for `templateID` and `passID`.

```js
passdock.passes.show( 2309, 123, console.log )
```


### passes.delete ( templateID, passID, callback )

Delete one pass with `passID` using `templateID`.

```js
passdock.passes.delete( 2309, 123, console.log )
```


### passes.create ( templateID, passObject, callback )

Create a new pass using `templateID`.

`passObject` can have these properties:


    serial_number  required  The serial number for the Pass, must be unique and
                            cannot be changed
    
    bar.message    optional  The message to be put in the code
    bar.altText    optional  The alternative text that will be put below the code
    
    For template keys (KEY = keyname):
    KEY.label      optional  The label for the field, usually placed above the value
    KEY.value      optional  The value of the field, usually placed below the label
    KEY.message    optional  The change message that will be shown in the lock screen
                            and as notification when the value for the field is
                            changed remotely

```js
// KFC pass
var pass = {
	serial_number:		'helloWorld123',
	bar: {
		message:		'http://domain.tld/pass?id=123',
	},
	Date: {
		value:			'29-12-2012'
	},
	PROMOTION: {
		value:			'blah'
	},
	ADDRESS: {
		label:			'Different',
		value:			'hello world'
	}
}

passdock.passes.create( 2309, pass, console.log )
```


### passes.update( templateID, passID, pass, callback )

Update an existing pass `passID` that is using `templateID`.

`pass` can have the same properties as in `passes.create`, but only set the props you wish to change.

```js
passdock.passes.update( 2309, 432, {bar: {message: 'myapp://pass/123'}}, console.log )
```


Unlicense
=========

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
