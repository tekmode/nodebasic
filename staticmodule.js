  var static = require( 'node-static' ),
      port = 8080,
      http = require( 'http' );
  // config
  var file = new static.Server( './public', {
      cache: 3600,
      gzip: false
  } );

  // serve
  http.createServer( function ( request, response ) {
      request.addListener( 'end', function () {
          file.serve( request, response );
      } ).resume();
  } ).listen( port )
