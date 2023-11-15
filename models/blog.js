const mongoose= require('mongoose');
const Schema = mongoose.Schema;
//schema is the structure of the database
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
},{timestamps:true});

//creating a model surrounds the schema and provides a interface
//to communicate with the interface
//typically models are given capital lettes
const Blog = mongoose.model('Blogu',blogSchema)
module.exports = Blog;