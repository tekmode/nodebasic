var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017";
var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end(`Hello <strong>home page</strong><br>
<a href="/dbcon">Database Connection</a><br>
<a href="/showemp">Show Employees</a><br>
<a href="/addemp">Add Employees</a><br>
<a href="/upemp">Update Employees</a><br>
<a href="/delemp">Delete Employees</a><br>
<a href="/filecopy">File Copy</a><br>
`
);
} else if (req.url === '/dbcon' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true }, function(err, db) {
          if (err) throw err;
         console.log("Database created!");
    res.end("Database Connected");
});
      
} 
else if (req.url === '/addemp' && req.method === 'GET') {
    
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
      
} else if (req.url === '/upemp' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true }, function(err, db) {
          if (err) throw err;
         var dbo = db.db("test");
        dbo.collection("people").updateOne({name:"Rashid Mukhtar"},{$set:{name:"Muhammad Rashid Mukhtar"}},(function(err, result) {
           if (err) throw err;
                     res.end("Updated Successfully");
        }));
    });
      
} else if (req.url === '/delemp' && req.method === 'GET') {
    
    MongoClient.connect(url1, { useNewUrlParser: true }, function(err, db) {
          if (err) throw err;
         var dbo = db.db("test");
        dbo.collection("people").deleteOne({name:"Human"},(function(err, result) {
           if (err) throw err;
                     res.end("Deleted Successfully");
        }));
});
      
} else if (req.url === '/showemp' && req.method === 'GET') {
    MongoClient.connect(url1, function(err, db) {
        if (err) throw err;
         var dbo = db.db("bse8a");
        dbo.collection("customers").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.end(JSON.stringify(result));
               db.close();
          });
        }); 
} 
else if (req.url === '/filecopy' && req.method === 'GET') {
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

