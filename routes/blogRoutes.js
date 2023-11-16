const express = require('express');
const router = express.Router();
const app = express();
// const Blog = require('./');
const Blog = require('../models/blog')
//retrieve all the collections
router.get('/',(req,res)=>{
    Blog.find().then((result)=>{
      res.send(result)
    }).catch((err)=>{
      console.log(err)
    })
  })

  router.post('/',(req,res)=>{
    //we are creating an instance of the blog
    //and passing the values to it creating a model
    //and saving the model in the cloud  
//   const blog = new Blog({
//     title:'new blog',
//     snippet:'about new',
//     body:'about new blog',
//   });

const blog = new Blog(req.body);
  blog.save().then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err);
  });
  
  })

  module.exports = router;


  //controller: extract the handler function into separate controller file and
  //refernce the controller func in our routes file
  //split 