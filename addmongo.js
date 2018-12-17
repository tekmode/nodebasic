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
var Team = mongoose.model('Team', TeamSchema);
db.on('error', function () {
console.log('there was an error communicating with the database');
});
mongoose.connect(dbUrl, function (err) {
if (err) {
return console.log('there was a problem connecting to the database!' + err);
}
console.log('connected!');
var team = new Team({
name: 'ABC'
});
team.save(function (error, data) {
if (error) {
console.log(error);
} else {
console.dir(data);
}
db.close();
process.exit();
});
});
