"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showallcomment = exports.updateComment = exports.deletecomment = exports.createComment = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const createComment = async (req, res) => {
    let taskId = req.params.id;
    let userId = req.userId;
    console.log("userId", taskId);
    let comments = req.body.content;
    console.log("comment", comments);
    try {
        let newcomment = new comment_model_1.default({
            taskId,
            userId,
            content: comments,
        });
        console.log("newcomment", newcomment);
        let data = await newcomment.save();
        console.log("data", data);
        // let _id=taskId;
        // let  todolaest=await Todo.findById(_id);
        // console.log("commentaddeddata",todolaest);
        //        let updateddata= await Todo.findByIdAndUpdate(_id, {
        //   $push: { comments:data._id }
        // });
        // console.log("something updated",updateddata);
        return res.status(200).json({
            message: "data got successfully",
            data: newcomment
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
};
exports.createComment = createComment;
const deletecomment = async (req, res) => {
    let id = req.params.id;
    console.log("id", id);
    try {
        let deletedcomment = await comment_model_1.default.findByIdAndDelete(id);
        console.log("deleted comment", deletedcomment);
        return res.status(200).json({
            message: "data got successfully",
            data: deletedcomment
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
};
exports.deletecomment = deletecomment;
// export const updateComment=async(req:any,res:Response)=>{
//     let id=req.params.editingId;
//     console.log("updatedcomment",id);
//     console.log("id",id);
//     let taskId=id;
//     let content=req.body.content;
// console.log("updatedcommnet data",content,id);
//     try{
//         let updatedcomment=await Comment.findByIdAndUpdate(taskId,content,{new:true});
//         console.log("updated comment",updatedcomment);
//         return res.status(200).json({
//             message:"data got successfully",
//             data:updatedcomment
//         })
//     }
//     catch(err:any){
//         return res.status(500).json({
//             message:"internal server error"
//         })
//     }
// }
// D:\TODO\Backend\src\controllers/your_controller_file.ts
const updateComment = async (req, res) => {
    let id = req.params.editingId;
    let content = req.body.content;
    console.log("updated comment data:", content, "for ID:", id);
    let taskId = id;
    try {
        // Correctly find the comment by its _id and update the 'content' field
        const updatedcomment = await comment_model_1.default.findByIdAndUpdate(taskId, { content: content }, { new: true });
        if (!updatedcomment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        console.log("updated comment:", updatedcomment);
        return res.status(200).json({
            message: "Comment updated successfully",
            data: updatedcomment
        });
    }
    catch (err) {
        console.error("Error updating comment:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.updateComment = updateComment;
const showallcomment = async (req, res) => {
    let taskId = req.params.taskId;
    console.log("taskid", taskId);
    try {
        let allcomment = await comment_model_1.default.find({ taskId: taskId });
        console.log("all comment", allcomment);
        return res.status(200).json({
            message: "data got successfully",
            data: allcomment
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
};
exports.showallcomment = showallcomment;
