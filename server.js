const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `AT: ${now}, METHOD: ${req.method}, URL: ${req.url}\n`;
  log = log.replace('GMT+0530 (India Standard Time)','');
  console.log(log);
fs.appendFileSync('serverlog.txt',log,(err)=>{
  console.log(err)
});
next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('boldIt',(txt)=>{
  return txt.toUpperCase();
});
app.get('/',(req,res)=>{
  res.render('home.hbs'
  ,{
    welcomeMessage:'Welcome,Nice to see you!',
    title: 'Home',
    pageName: 'Home Page',

  });
});

app.get('/about',(req,res)=>{
  // res.send("<h1>About Page</h1>")
  res.render('about.hbs'
  ,{
    title: 'About',
    pageName: 'About page',
  });
});

app.get('/projects',(req,res)=>{
  // res.send("<h1>About Page</h1>")
  res.render('projects.hbs'
  ,{
    title: 'Projects',
    pageName: 'Projects page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMsg: 'Unable to process'
  })
});


app.listen(port,()=>{
  console.log(`Listening to  ${port}`)
});
