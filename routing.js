var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} else if (req.url === '/account' && req.method === 'GET') {
    fs.readFile('account.txt', function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
         }else {	
            res.writeHead(200, {'Content-Type': 'text/html'});	          
            res.write(data.toString());		
         }
         res.end();
      });   
      
} 
else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);
