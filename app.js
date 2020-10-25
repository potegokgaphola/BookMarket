var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/app/public'));

app.post('signup', function(req, res) {
    console.log(SON.stringify({
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

app.listen(8000);

// var userId = 0;
// getUserNextId() {
//     return userId++;
// }