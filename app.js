const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('debug')('app');


const port = process.env.PORT || 8000;
const nav = [
  { link: '/home', title: 'Home' },
  { link: '/about', title: 'About' },
  { link: '/privacy', title: 'Privacy' },
];

// user auth
app.use(cookieParser());
app.use(session({ secret: 'book-market-super-secret-token' }));
require('./src/config/passport.js')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const startPageRouter = require('./src/routes/startPage')(nav);
const authRouter = require('./src/routes/authRoutes')();

app.use('/', startPageRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      nav
    });
});

app.listen(port, () => console.info(`server listening on port ${port}`));
