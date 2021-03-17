var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/";
var url2 = "mongodb://localhost:27017/mydb";
var http = require('http');
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello <strong>home page</strong>');
} 
else if (req.url === '/connect' && req.method === 'GET') {
    
    MongoClient.connect(url2, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
         console.log("Database created!");
    res.end("Database Connected");
});
      
}
else if (req.url === '/add' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
         console.log("Database created!");
         var dbo = db.db("mydb");
         var myobj = { name: "Human", address: "Pakistan" };
         dbo.collection("customers").insertOne(myobj, function(err, result) {
          if (err) throw err;
            console.log("1 document inserted");
         res.end('Record Added Successfully');
           	});        
});
      
} 
else if (req.url === '/find' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
          if (err) throw err;
         console.log("Database created!");
         var dbo = db.db("mydb");
         dbo.collection("customers").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);  
            res.end(JSON.stringify(result));   
            });
});     
} 
else {
res.writeHead(404, {'Content-Type': 'text/html'});
res.end();
}
}).listen(1337);

