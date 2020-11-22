const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;
const nav = [
  { link: '/home', title: 'Home' },
  { link: '/about', title: 'About' },
  { link: '/privacy', title: 'Privacy' },
];

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const startPageRouter = require('./src/routes/startPage')(nav);

app.use('/', startPageRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      nav
    });
});

app.listen(port, () => console.info(`server listening on port ${port}`));
