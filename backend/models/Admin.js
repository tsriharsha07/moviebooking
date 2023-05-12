const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        reuired:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    addedMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    }]
})


module.exports = mongoose.model('Admin', adminSchema)