var http = require('http');
var mongoose = require('mongoose');
//var db = mongoose.connection;
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/employee';
var EmpSchema = Schema({
    name: {
        type: String,
        required: true
    }
});
var Employee = mongoose.model('Employee', EmpSchema);

http.createServer(function(req, res) {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<center><h1>Hello Welcome</h1>');
        res.write('Add employee into DB using Mongoose: <a href="/addemp">Click Here</a><br>');
        res.write('Show employees with specific name: <a href="/showemp">Click Here</a><br>');
        res.write('Delete specific employee: <a href="/delemp">Click Here</a><br>');
        res.write('Update Specific Employee info: <a href="/editemp">Click Here</a></center>');
        res.end();
    } else if (req.url === '/editemp' && req.method === 'GET') {
        mongoose.connect(dbUrl, function(err) {
            if (err) {
                return console.log('there was a problem connecting to the database!' + err);
            }
            console.log('connected!');
            Employee.findOneAndUpdate({ name: 'Hamid' }, { name: 'Muhammad Rashid Mukhtar' },
                function(err, author) {
                    if (err) throw err;
                    res.end(author.toString());
                });

        });

    } else if (req.url === '/delemp' && req.method === 'GET') {
        mongoose.connect(dbUrl, function(err) {
            if (err) {
                return console.log('there was a problem connecting to the database!' + err);
            }
            console.log('connected!');
            Employee.deleteOne({ name: 'Hamid' }, function(err) {
                if (err) return handleError(err);
                res.end('Record Deleted Successfully');
            });

        });
    } else if (req.url === '/addemp' && req.method === 'GET') {
        mongoose.connect(dbUrl, function(err) {
            if (err) {
                return console.log('there was a problem connecting to the database!' + err);
            }
            console.log('connected!');
            var emp = new Employee({
                name: 'Hamid'
            });
            emp.save(function(error, data) {
                if (error) {
                    console.log(error);
                } else {
                    res.end('Record Added Successfully');
                }

            });
        });


    } else if (req.url === '/showemp' && req.method === 'GET') {
        mongoose.connect(dbUrl, function(err) {
            if (err) {
                return console.log('there was a problem connecting to the database!' + err);
            }
            console.log('connected!');
            Employee.find({}).exec(function(err, rec) {
                if (err) throw err;
                res.end(rec.toString());
            });
        });


    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
}).listen(3000);