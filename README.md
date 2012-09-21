nodejs-passdock
===============

Node.js module for [http://passdock.com/](PassDock) API methods for iOS 6 PassBook.

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
