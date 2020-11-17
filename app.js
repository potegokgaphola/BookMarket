var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var engine = require('consolidate');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname, '/public');
app.engine('html', engine.mustache);
app.set('view engine', 'html');
// app.get('/', function(req, res) {
//     res.render('index')
// })

app.get('/home', function(req, res) {
    res.render('login')
})

app.post('/signup', function(req, res) {
    console.log(JSON.stringify({
        userId: 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    }))
    res.type('json')
    res.end(JSON.stringify({
        userId: 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    }))
})

var server = app.listen(8000);