import {Request,Response} from "express";
import Comment from "../models/comment.model";
import Todo from "../models/todo.model";



export const createComment=async(req:any,res:Response)=>{
          let taskId=req.params.id;
          let userId=req.userId;
console.log("userId",taskId);
          let comments=req.body.content;
          console.log("comment",comments);

    try{
        let newcomment= new Comment({
            taskId,
            userId,
           content:comments,
        })
        console.log("newcomment",newcomment);
     let data=await newcomment.save();
     console.log("data",data);
// let _id=taskId;
// let  todolaest=await Todo.findById(_id);
// console.log("commentaddeddata",todolaest);
//        let updateddata= await Todo.findByIdAndUpdate(_id, {
//   $push: { comments:data._id }
// });

// console.log("something updated",updateddata);

        return res.status(200).json({
            message:"data got successfully",
            data:newcomment
        })

    }
    catch(err:any){
return res.status(500).json({
    message:"internal server error"
})
    }

}


export const deletecomment=async(req:any,res:Response)=>{

    let id=req.params.id;
    console.log("id",id);
    try{
        let deletedcomment=await Comment.findByIdAndDelete(id);
        console.log("deleted comment",deletedcomment);
        return res.status(200).json({
            message:"data got successfully",
            data:deletedcomment
        })
    }
    catch(err:any){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}



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

export const updateComment = async(req:any, res:Response) => {
    let id = req.params.editingId;
    let content = req.body.content;

    console.log("updated comment data:", content, "for ID:", id);
let taskId=id;
    try {
        // Correctly find the comment by its _id and update the 'content' field
        const updatedcomment = await Comment.findByIdAndUpdate(taskId, { content: content }, { new: true });
        
        if (!updatedcomment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        console.log("updated comment:", updatedcomment);
        
        return res.status(200).json({
            message: "Comment updated successfully",
            data: updatedcomment
        });
    } catch (err:any) {
        console.error("Error updating comment:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export const showallcomment=async(req:any,res:Response)=>{
         let taskId=req.params.taskId;
         console.log("taskid",taskId);
    try{
        let allcomment=await Comment.find({taskId:taskId});
        console.log("all comment",allcomment);
        return res.status(200).json({
            message:"data got successfully",
            data:allcomment
        })
    }
    catch(err:any){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}