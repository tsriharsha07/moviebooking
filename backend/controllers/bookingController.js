const Booking=require('../models/Booking');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.newBooking = async(req,res)=>{
    try {
        const {movie,date,seatNumber,user}=req.body;
        const newbooking = new Booking({movie,date:new Date(`${date}`),seatNumber,user});
        await newbooking.save();
        const bookingUser=await User.findById(user);
        const existingMovie=await Movie.findById(movie);
        if(!bookingUser){
            return res.status(500).json({message: "User does not exist"});
        }
        if(!existingMovie){
            
            return res.status(500).json({message: "Movie does not exist"});
        }
        bookingUser.booking.push(newbooking);
        existingMovie.bookings.push(newbooking);
        await bookingUser.save();
        await existingMovie.save();
        if(!newbooking){
            return res.status(500).json({message:"Booking not completed. Please try again."});
        }
        return res.status(200).json({success:true,booking:newbooking})
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

exports.getBookingById=async(req,res)=>{
    try {
        const id = req.params.id;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(500).json({ message: "Unexpected error occured" });
        }
        return res.status(200).json({
            success: "true",
            booking
        })
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occured" });
    }
}

exports.deleteBooking=async(req,res)=>{
    const id=req.params.id;
    try {
        const booking=await Booking.findByIdAndRemove(id).populate("user movie")
        await booking.user.booking.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save();
        await booking.user.save();
        if (!booking) {
            return res.status(500).json({ message: "Unable to Delete" });
          }
          return res.status(200).json({ message: "Successfully Deleted" });
         
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
