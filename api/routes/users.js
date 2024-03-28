import express from "express"
import User from "../models/users.js"
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js"

const router=express.Router()

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello,logged in")
// })

// router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
//     res.send("User Logged in,You can delete now!")
// })

// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Admin Logged in,You can delete all accounts")
// })

router.put("/:id",verifyUser,async (req,res,next)=>{      //update
    try {
        const updatedUser=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }    
    catch(err){
        next(err)
    }
})

router.delete("/:id",verifyUser,async (req,res,next)=>{              //delete
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }
    catch(err){
        next(err)
    }
})

router.get("/:id",verifyUser,async(req,res,next)=>{                 //get
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
})

router.get("/",verifyAdmin,async(req,res,next)=>{                    //get All
    try{
        const users=await User.find()
        res.status(200).json(users)
    }
    catch(err){
        next(err)
    }
})

export default router
