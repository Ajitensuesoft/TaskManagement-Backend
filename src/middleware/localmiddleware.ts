
import  Jwt  from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
export const authverify=async(req:any,res:Response,next:NextFunction)=>{
    
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"no token"});
    }
    try{
        const decoded=Jwt.verify(token,process.env.JWT_SECRET_KEY!);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(500).json({
            message:"invalid token"
        })
    }
}

