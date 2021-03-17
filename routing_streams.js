var http = require('http');
var fs=require('fs');
var data = '';
http.createServer(function(req, res) {
if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} else if (req.url === '/account' && req.method === 'GET') {
    var stream = fs.createReadStream('abc.txt');
    stream.setEncoding('UTF8');
    stream.on('data', function(chunk) {
        data += chunk;
	//process.stdout.write(chunk);
	});
	stream.on('end', function() {
	res.end(data);
    });
    stream.on('error', function(error) {
        console.error(error.message);
        }); 
   
} else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);
