var http = require('http');
var fs=require('fs');
var data = '';
http.createServer(function(req, res) {
if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} else if (req.url === '/account' && req.method === 'GET') {
    var readableStream = fs.createReadStream('abc.txt');
    var writableStream = fs.createWriteStream('file2.txt');
    readableStream.pipe(writableStream);
    readableStream.pipe(res);      
   
}
else if (req.url === '/abc' && req.method === 'GET') {
    var readableStream = fs.createReadStream('abc.txt');
    var writableStream = fs.createWriteStream('file2.txt');
    readableStream.pipe(writableStream);
    readableStream.pipe(res);      
   
}

else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);
