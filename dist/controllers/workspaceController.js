"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteworkspace = exports.createworspace = exports.getworspace = void 0;
const WorkSpaceModel_1 = __importDefault(require("../models/WorkSpaceModel"));
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
const getworspace = async (req, res) => {
    const userId = req.userId;
    try {
        const data = await WorkSpaceModel_1.default.find({
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
    }
    catch (err) {
        console.error('Error fetching workspaces:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getworspace = getworspace;
const createworspace = async (req, res) => {
    const userId = req.userId;
    const name = req.body.name;
    try {
        let newworkspace = new WorkSpaceModel_1.default({ userId, name });
        console.log("newworkspace", newworkspace);
        let data = await newworkspace.save();
        console.log("data", data);
        return res.status(200).json({
            message: "data got successfully",
            data: data,
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json("message internal server error");
    }
};
exports.createworspace = createworspace;
const deleteworkspace = async (req, res) => {
    let id = req.params.workspaceId;
    try {
        let data = await WorkSpaceModel_1.default.findByIdAndDelete({ _id: id });
        console.log("data", data);
        return res.status(200).json({
            message: "data got successfully",
            data: data,
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json("message internal server error");
    }
};
exports.deleteworkspace = deleteworkspace;
