var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/mydb";
var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} else if (req.url === '/account' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true }, function(err, db) {
          if (err) throw err;
         console.log("Database created!");
    res.end("Database Connected");
    db.close();
});
      
} 
else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);

