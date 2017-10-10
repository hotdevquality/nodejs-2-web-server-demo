const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

// server log middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

// maintenance middleware
/*app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance Page'
  })
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //resp.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageGreeting: 'Welcome to my new website'
  });
});

app.get('/', (req, res) => {
  res.send('/', {
    name: 'Timo Brown',
    likes: [
      'Football',
      'Lawn-tennis',
      'Travelling'
    ]
  });
});

app.get('/about', (req, res) => {
  //resp.send('About Me');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request'
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
