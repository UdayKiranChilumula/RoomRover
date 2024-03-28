import express from "express"
import Room from "../models/rooms.js"
import Hotel from "../models/hotels.js"
import {verifyAdmin} from "../utils/verifyToken.js"

const router=express.Router()

router.post("/:hotelid",verifyAdmin,async (req,res,next)=>{         //create
    const hotelId=req.params.hotelid
    const newRoom=new Room(req.body)
    try{
        const savedRoom=await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        }
        catch{
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch(err){
        next(err)
    }
})

router.put("/:id",verifyAdmin,async (req,res,next)=>{      //update
    try {
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)
    }    
    catch(err){
        next(err)
    }
})

router.put("/availability/:id", async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.date
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  });

router.delete("/:id/:hotelid",verifyAdmin,async (req,res,next)=>{              //delete
    const hotelId=req.params.hotelid
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        }
        catch{
            next(err)
        }
        res.status(200).json("Room has been deleted")
    }
    catch(err){
        next(err)
    }
})

router.get("/:id",async(req,res,next)=>{                 //get
    try{
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
})

router.get("/",async(req,res,next)=>{                    //get All
    try{
        const rooms=await Room.find()
        res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
})

export default router