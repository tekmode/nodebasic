var http = require('http');
var fs = require('fs');
var data = '';
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
        data1 = "Request for " + req.url + "with method" + req.method + "received.\n";
        fs.appendFile('log.txt',  data1,  function (err) {  
            if  (err)  throw  err; 
            console.log('log Entry saved');
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Hello</h1><p><center><a href="/">Home</a>||
<a href="/read">Read Stream</a>||<a href="/write">Write Stream</a>||
<a href="/show">Show File</a></center></p>
<p>Welcome Page</p>
`);
        res.end();
    } else if (req.url === '/read' && req.method === 'GET') {
        data1 = "Request for " + req.url + "with method" + req.method + "received.\n";
        fs.appendFile('log.txt',  data1,  function (err) {  
            if  (err)  throw  err; 
            console.log('log Entry saved');
        });
        //res.writeHead(200, { 'Content-Type': 'text/html' });
        var readableStream = fs.createReadStream('read.txt');
        readableStream.pipe(res);
    } else if (req.url === '/write' && req.method === 'GET') {
        data1 = "Request for " + req.url + "with method" + req.method + "received.\n";
        fs.appendFile('log.txt',  data1,  function (err) {  
            if  (err)  throw  err; 
            console.log('log Entry saved');
        });
        var readableStream = fs.createReadStream('read.txt');
        var writableStream = fs.createWriteStream('file1.txt');
        readableStream.pipe(writableStream);
        readableStream.pipe(res);
        // res.end("File Created");

    } else if (req.url === '/show' && req.method === 'GET') {
        data1 = "Request for " + req.url + "with method" + req.method + "received.\n";
        fs.appendFile('log.txt',  data1,  function (err) {  
            if  (err)  throw  err; 
            console.log('log Entry saved');
        });
        var readableStream = fs.createReadStream('read.txt');
        readableStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
}).listen(1337);