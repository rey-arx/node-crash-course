const mongoose= require('mongoose');
const Schema = mongoose.Schema;
//schema is the structure of the database
const blogSchema = new Schema({
    name:String,
    age:Number,
    gender:String
});

//creating a model surrounds the schema and provides a interface
//to communicate with the interface
//typically models are given capital lettes
const Employee = mongoose.model('EmployeeDetail',blogSchema)
module.exports = Employee;