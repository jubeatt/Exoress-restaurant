const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const apiController = require('./controllers/apiController')
const pageController = require('./controllers/pageController')
const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
})

const toPreviousPage = (req, res) => {
  return res.redirect('back');
}
const checkPermission = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/');
  }
  next();
}

app.get('/', pageController.index);
app.get('/draw', pageController.draw);
app.get('/question', pageController.question);
app.get('/api/draw', apiController.draw);

app.get('/login', userController.login);
app.post('/login', userController.handleLogin, toPreviousPage);
app.get('/logout', userController.logout);


app.get('/admin', adminController.console);
app.get('/admin/draw', adminController.draw)
app.get('/admin/draw/add-prize', adminController.addPrize);
app.post('/admin/draw/add-prize', adminController.handleAddPrize, toPreviousPage);
app.get('/admin/draw/update-prize', adminController.updatePrize);
app.post('/admin/draw/update-prize', adminController.handleUpdatePrize, toPreviousPage);
app.get('/admin/draw/delete-prize', adminController.deletePrize);
app.get('/admin/draw/announcement', adminController.announcement);
app.post('/admin/draw/announcement', adminController.handleAnnouncement, toPreviousPage);

app.listen(port, () => {
  console.log(`The app is Listening on port ${port}`);
})