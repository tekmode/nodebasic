var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer( function (request, response) {
var pathname = url.parse(request.url).pathname;
if (pathname=='/a.html')
{
fs.readFile('abc.txt', function (err, data) {
if (err) { console.log(err);
response.writeHead(404, {'Content-Type': 'text/html'});
}
else{
response.writeHead(200, {'Content-Type': 'text/html'});
response.write('<h1>'+data+'</h1>');}
response.end();
});
}
else {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end("Nothing to show");
}
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
