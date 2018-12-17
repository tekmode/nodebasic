var http = require('http');
var url = require('url');
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} else if (req.url === '/account' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});	        
    res.end('Hello <strong>Account page</strong>');      
} 
else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);

