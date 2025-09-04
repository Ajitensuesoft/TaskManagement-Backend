import Workspace from '../models/WorkSpaceModel';
import {Request,Response}from "express";


// here i have to apply condition 
// export const getworspace=async(req:any,res:Response)=>{
//     let userId=(req as any).userId;

//     try{
//         let data=await Workspace.find({userId});
//         console.log("data",data);
//         return res.status(200).json({
//          message:"data got successfully",
//          data:data,
//         })
//     }
//     catch(err){
//         console.log("err",err);
//         return res.status(500).json("message internal server error");
//     }
// }


// import { Request, Response } from 'express';
// import Workspace from '../models/workspace.model';

export const getworspace = async (req: any, res: Response) => {
  const userId = req.userId;

  try {
    const data = await Workspace.find({
      $or: [
        { userId }, // ✅ owner
        { 'members.userId': userId } // ✅ member
      ]
    });

    console.log('Filtered workspaces:', data);

    return res.status(200).json({
      message: 'Workspaces fetched successfully',
      data
    });
  } catch (err) {
    console.error('Error fetching workspaces:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const createworspace=async(req:any,res:Response)=>{
const userId = (req as any).userId;
const name=req.body.name;

try{

    let  newworkspace= new Workspace({userId,name});
    console.log("newworkspace",newworkspace);
    let data=await newworkspace.save();
    console.log("data",data);
    return res.status(200).json({
        message:"data got successfully",
        data:data,
       })
}

catch(err:any){
    console.log("err",err);
    return res.status(500).json("message internal server error");
}
}




export const deleteworkspace=async(req:any,res:Response)=>{

    let id=req.params.workspaceId;
    try{
        let data=await Workspace.findByIdAndDelete({_id:id});
        console.log("data",data);
        return res.status(200).json({
         message:"data got successfully",
         data:data,
        })
    }
    catch(err:any){
        console.log("err",err);
        return res.status(500).json("message internal server error");
    }
}