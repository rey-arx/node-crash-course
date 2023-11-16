const express = require('express');
const morgan = require('morgan');
// express app
const app = express();
//to get other files on public folder
app.use(express.static('public'));
// app.use(express.urlencoded({extended:true}))
//to parse json files
app.use(express.json());
const mongoose = require('mongoose');

//we will use this in blogroute
//required previously but now changed to blogroutes
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')
// const Employee = require('./models/employee')
// listen for requests
app.listen(3000);
const dbURI = 'mongodb+srv://ReyhanMaddy:allah786@teamtrack.offsab8.mongodb.net/node-tut?retryWrites=true&w=majority'
mongoose. connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console. log('connected to db'))
.catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

//mongo db operations:
app.use('/blogs',blogRoutes);


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


//getting data from website and doing post operation
// app.post('/blogs' , (req,res)=>{
// console.log(req.body)
// })

//for delete
app.get('/blogdelete/:id',(req,res)=>{
  Blog.findByIdAndDelete(req.params.id).then(result =>{
    res.send('<p>deleted</p>')
    console.log("deleted")
  }).catch(err=>{
    console.log(err);
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


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
