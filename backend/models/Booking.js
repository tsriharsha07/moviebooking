const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    },
    date:{
        type:Date,
        required:true,
    },
    seatNumber:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Users"
    }
})


module.exports = mongoose.model('Booking', bookingSchema)