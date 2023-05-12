const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
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
    booking:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Booking"
    }]
})


module.exports = mongoose.model('Users', userSchema)