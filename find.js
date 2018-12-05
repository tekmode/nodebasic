var mongoose= require('mongoose')
var db = mongoose.connection;
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/team';
var TeamSchema = Schema({
name: {
type: String,
required: true
}
});

var Team = mongoose.model('Team',TeamSchema);
db.on('error', function () {
console.log('there was an error communicating with the database');
});
mongoose.connect(dbUrl, function (err) {
if (err) {
return console.log('there was a problem connecting to the database!' + err);
}
console.log('connected!');
Team.find({name: 'EE'}, function(err, obj) {
    console.log(obj[0].name)  // undefined
  //  console.log(obj[0].toObject().name)  // 1234
});
});

//db.close();
//process.exit();
