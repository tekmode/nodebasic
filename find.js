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
mongoose.connect(dbUrl, function (err) {
if (err) {
return console.log('there was a problem connecting to the database!' + err);
}
Team.find({name: 'EE'}, function(err, obj) {
    console.log(obj); 
});
});

