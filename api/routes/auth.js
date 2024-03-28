import express from "express"
import User from "../models/users.js"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

const router=express.Router()

router.post("/register",async(req,res,next)=>{
    try{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        })
        await newUser.save().then(()=>{})
        res.status(200).send("User has been created.")
    }
    catch(err){
        next(err)
    }
})
 
router.post("/login",async(req,res,next)=>{
    try{
        const user= await User.findOne({
            username:req.body.username
        })
        if (!user) return next(createError(404, "User not found!"))

        if(user.password!==req.body.password)
        return next(createError(400, "Wrong password or username!"))
        
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.Key
          );
      
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {httpOnly: true,}).status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    }
    catch(err){
        next(err)
    }
})

export default router