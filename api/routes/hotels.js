import express from "express"
import Hotel from "../models/hotels.js"
import Room from "../models/rooms.js"

import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js"

const router=express.Router()

router.post("/",verifyAdmin,async (req,res,next)=>{         //create
    const newHotel=new Hotel(req.body)
    try{
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch(err){
        next(err)
    }
})

router.put("/:id",verifyAdmin,async (req,res,next)=>{      //update
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    }    
    catch(err){
        next(err)
    }
})

router.delete("/:id",verifyAdmin,async (req,res,next)=>{              //delete
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }
    catch(err){
        next(err)
    }
})

router.get("/find/:id",async(req,res,next)=>{                 //get
    try{
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(err){
        next(err)
    }
})

router.get("/",async(req,res,next)=>{  
    const {limit,min,max,...others}=req.query                                            //get All
    try{
        const hotels=await Hotel.find({...others,cheapestPrice:{$gte :min || 1,$lte :max || 9999},}).limit(limit)
        res.status(200).json(hotels)
    }
    catch(err){
        next(err)
    }
})

router.get("/countByCity",async(req,res,next)=>{                    
    const cities=req.query.cities.split(",")                  
    try{
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
})

router.get("/countByType",async(req,res,next)=>{  
    try{
        const hotelCount= await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount= await Hotel.countDocuments({type:"Apartment"})
        const resortCount= await Hotel.countDocuments({type:"Resort"})
        const villaCount= await Hotel.countDocuments({type:"Villa"})
        const cabinCount= await Hotel.countDocuments({type:"Cabin"})

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount},
        ])
    }
    catch(err){
        next(err)
    }
})

router.get("/room/:id",async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  });

export default router
