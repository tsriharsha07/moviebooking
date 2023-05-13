const Users=require('../models/User')
const bcrypt=require('bcryptjs')
const Booking=require('../models/Booking')

exports.getUsers=async(req,res,next)=>{
    try {
        const users=await Users.find();
        if(!users){
            return res.status(500).json({message:"Unexpected error occured"});
        }

        return res.status(200).json({
            success:"true",
            users:users
        })
    } catch (error) {
        return next(error);
    }
} 

exports.createUser=async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        const hashpassword=await bcrypt.hash(password,12)
        const user=new Users({name,email,password:hashpassword});
        await user.save();
        if(!user){
            return res.status(404).json({
                message:"unexpected error"
            })
        }
        return res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

exports.updateUser=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const  {name,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password,12)
        const user=await Users.findByIdAndUpdate(id,{name,email,password:hashpassword});
        await user.save();
        if(!user){
            return res.status(500).json({message:"Unknown Error Occured"});
        }    
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.logIn=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const {email,password}=req.body;
        const existingUser=await Users.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Invalid Email"
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
        return res.status(200).json({
            success:true,
            user:existingUser
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.deleteUser=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const user=await Users.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:"User does not exist"})
        }
        return res.status(200).json({success: true})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
} 

exports.getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Booking.find({ user: id })
        .populate("movie")
        .populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
  };

  exports.getUserById=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(500).json({ message: "Unexpected error occured" });
        }
        return res.status(200).json({
            success: "true",
            user
        })
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occured" });
    }
  }