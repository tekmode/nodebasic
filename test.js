var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var url1= "mongodb+srv://rashid:<password>@cluster0.ipntm.mongodb.net/test";


MongoClient.connect(url, function(err, db) {
      if (err) throw err;
     var dbo = db.db("bse8a");
     dbo.collection("customers").find({name:'John'}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
         });
        });
