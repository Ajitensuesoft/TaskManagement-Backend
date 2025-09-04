
import Invited  from "../models/Invited.model";


import { Request, Response } from "express";


export const createInvited = async (req:Request,res:Response)=>{
    const {inviterId,invitedId,UserId,taskId}=req.body;
    console.log("creaetedinviteduserid",inviterId,invitedId,UserId,taskId);
    
    try{

        const Invite = await Invited.create({inviterId,invitedId,UserId,taskId});
        console.log("Invite",Invite);
        return res.status(200).json({
            message:'Invited created successfully',
            Invited:Invite,
        })
    }
    catch(err){
        return res.status(500).json({
            message:'internal server error'
        })
    }
}


export const getInvited=async(req:Request,res:Response)=>{

    try{
        const Invite=await Invited.find();
        console.log("Invite",Invite);
        return res.status(200).json({
            message:'Invited fetched successfully',
            Invited:Invite,
        })
    }
    catch(err){
        return res.status(500).json({
            message:'internal server error'
        })
    }
}