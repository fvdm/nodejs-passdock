/*
Name      : passdock
Source    : https://github.com/fvdm/nodejs-passdock
Feedback  : https://github.com/fvdm/nodejs-passdock/issues
License   : Unlicense / Public Domain

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
*/

var https = require('https'),
    querystring = require('querystring')

var app = {
	api: {
		host: 'api.passdock.com',
		path: '/api/v1/',
		token: ''
	}
}

// Communicate
app.talk = function( method, path, fields, cb ) {
	if( !cb && typeof fields == 'function' ) {
		var cb = fields
		var fields = {}
	}
	
	fields.api_token = app.api.token
	fields = querystring.stringify( fields )
	
	var options = {
		host: app.api.host,
		port: 443,
		path: app.api.path + path + (method == 'GET' ? '?'+ fields : ''),
		method: method,
		agent: false,
		headers: {
			Accept: 'application/json',
			'User-Agent': 'passdock.js (https://github.com/fvdm/nodejs-passdock)'
		}
	}
	
	if( method != 'GET' ) {
		options.headers['Content-Length'] = fields.length
	}
	
	var req = https.request( options, function( response ) {
		var data = ''
		response.on( 'data', function( d ) { data += d })
		response.on( 'end', function() {
			if( data.match( /^(\{.*\}|\[.*\])$/ ) ) {
				cb( JSON.parse( data ), true )
			} else {
				cb( data, false )
			}
		})
	})
	
	if( method == 'GET' ) {
		req.end()
	} else {
		req.write( fields )
		req.end()
	}
}

// Templates
app.templates = {
	list: function( cb ) { app.talk( 'GET', 'templates', cb ) },
	show: function( id, cb ) { app.talk( 'GET', 'templates/'+ id, cb ) },
	delete: function( id, cb ) { app.talk( 'DELETE', 'templates/'+ id, cb ) }
}

// Passes
app.passes = {
	list: function( tid, cb ) { app.talk( 'GET', 'templates/'+ tid +'/passes', cb ) },
	show: function( tid, id, cb ) { app.talk( 'GET', 'templates/'+ tid +'/passes/'+ id, cb ) },
	delete: function( tid, id, cb ) { app.talk( 'DELETE', 'templates/'+ tid +'/passes/'+ id, cb ) },
	create: function( tid, pass, cb ) { app.talk( 'POST', 'templates/'+ tid +'/passes', {pass: pass}, cb ) },
	update: function( tid, pid, pass, cb ) { app.talk( 'PUT', 'template/'+ tid +'/passes/'+ pid, {pass: pass}, cb ) }
}

// module magic
module.exports = app
