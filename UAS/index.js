const express = require('express');
const app = express()
const bodyparse = require('body-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')

const regisRouter = require('./routes/regis')
const signinRouter = require('./routes/signin')
const indexRouter = require('./routes/index')
const browseRouter = require('./routes/browse')
const produkRouter = require('./routes/produk')
const newsRouter = require('./routes/news')
const aboutRouter = require('./routes/about')
const faqRouter = require('./routes/faq')
const libraryRouter = require('./routes/library')

app.use(flash())
require('./config/passport')(passport);
app.use(express.static(path.join(__dirname, "assets")));
app.use(session({ secret: 'pass', resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs')
app.use(bodyparse.urlencoded({
    extended: false
}))
app.use(bodyparse.json())

const mongoose = require('mongoose')
mongoose.connect(
    "mongodb+srv://andriadmin:admin@virtual-labs.c359t.mongodb.net/virtual-labs?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }

);
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected'))

app.use('/regis', regisRouter)
app.use('/signin', signinRouter)
app.use('/browse', browseRouter)
app.use('/produk', produkRouter)
app.use('/newsindex', newsRouter)
app.use('/about', aboutRouter)
app.use('/faq', faqRouter)
app.use('/library', libraryRouter)
app.use('/', indexRouter)


app.post('/logintest', (req, res) => passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
})(req, res));


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.listen(3000);