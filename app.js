const express = require('express');
const morgan = require('morgan');

// express app
const app = express();
const mongoose = require('mongoose');
const {MongoClient} = require("mongodb");
const BLog = require('./models/blog');
const Blog = require('./models/blog');
// const Employee = require('./models/employee')
// listen for requests
app.listen(3000);
const dbURI = 'mongodb+srv://ReyhanMaddy:allah786@teamtrack.offsab8.mongodb.net/node-tut?retryWrites=true&w=majority'
mongoose. connect(dbURI)
.then((result) => console. log('connected to db'))
.catch((err) => console.log(err));

const client = new MongoClient(dbURI);

const database = client.db('sample_analytics');
const movies = database.collection('customers');
const query={username:'fmiller'};
// const disp = movies.findOne(query);
// console.log(JSON.stringify(disp) +'as');

// register view engine
app.set('view engine', 'ejs');

//mongo db operations:
app.get('/add-blog',(req,res)=>{
  //we are creating an instance of the blog
  //and passing the values to it creating a model
  //and saving the model in the cloud
const blog = new Blog({
  title:'new blog',
  snippet:'about new',
  body:'about new blog',
});
blog.save().then((result)=>{
  res.send(result)
})
.catch((err)=>{
  console.log(err);
});

})

//retrieve all the collections
app.get('/all-blogs',(req,res)=>{
  Blog.find().then((result)=>{
    res.send(result)
  }).catch((err)=>{
    console.log(err)
  })
})

//for single blog
app.get('/single-blog',(req,res)=>{
  Blog.findById('6551757468cb9bc2eda955cb').then((result)=>{
    res.send(result)
  }).catch((err)=>{
    console.log(err)
  });

})






// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
console.log(disp.name+'sss');

  
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
