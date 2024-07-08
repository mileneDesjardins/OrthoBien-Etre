import mongoose from 'mongoose';


const categoriesSchema = new mongoose.Schema({
    nomCategorie:{
      type:String,
      required:true,
      unique:true
    } ,
    codeCategorie:{
      type:Number,
      required:true,
      unique:true
    }

  }
);

//const Categories = mongoose.model('Categories',categoriesSchema);

//module.exports = Categories;

export default mongoose.model('Categories', categoriesSchema, 'Categories');

