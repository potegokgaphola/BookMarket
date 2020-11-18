const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/signup', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({
    userId: 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  }));
  res.type('json');
  res.end(JSON.stringify({
    userId: 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  }));
});

app.listen(8000);
