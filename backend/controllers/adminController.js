const Admin=require('../models/Admin');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.addAdmin=async(req,res )=>{
    try {
        const {email,password}=req.body;
        const existingAdmin=await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"})
        }
        const hashpassword=await bcrypt.hash(password,12)
        const admin=new Admin({email,password:hashpassword});
        await admin.save();
        return res.status(200).json({
            success: true,
            admin: admin
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

exports.adminLogin=async(req,res)=>{
    try {
        const id=req.params.id;
        const {email,password}=req.body;
        const existingAdmin=await Admin.findOne({email})
        if(!existingAdmin){
            return res.status(401).json({
                success:false,
                message:"Invalid Email"
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,existingAdmin.password);
        const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
            expiresIn:"7d"
        })
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
        return res.status(200).json({
            success:true,
            token,
            id:existingAdmin._id,
            admin:existingAdmin
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.getAdmins = async (req, res)=> {
    try {
        const admins=await Admin.find();
        if(!admins){
            return res.status(404).json({message:"Unexpected Error Occureed"})
        }
        return res.status(200).json({
            success:true,
            admins:admins
        })
    } catch (error) {
        return res.status(200).json(
            error.message
        )
    }
}

exports.getAdminById = async (req, res)=> {
    try {
        const id=req.params.id;
        const admin=await Admin.findById(id).populate("addedMovies");
        if(!admin){
            return res.status(404).json({message:"Unexpected Error Occureed"})
        }
        return res.status(200).json({
            success:true,
            admin:admin
        })
    } catch (error) {
        return res.status(200).json(
            error.message
        )
    }
}


