import cron from "node-cron";
import { sendEmail } from "./utils/mailer";
import Todo from "./models/todo.model";
import UserTo from "./models/usermodel";


cron.schedule("* * * * *", async () => {
  try {
    console.log("Running task reminder job...");
    const tasks = await Todo.find({ status: { $in: ["Pending", "InProgress"] } });

    const now = new Date();

    for (const task of tasks) {
      if (!task.duedate) continue; 

      const diff = new Date(task.duedate).getTime() - now.getTime();

      // Find the user by userId
      const user = await UserTo.findById(task.userId);
      if (!user) continue;

    
      
      if (
        diff <= 2 * 60 * 60 * 1000 &&
        diff > 60 * 60 * 1000 &&
        !task.twohourremaindersent
      ) {
        await sendEmail(
          user.email,
          "Task Reminder - 2 Hours Left",
          `Your task "${task.title}" is due in 2 hours.`
        );
        task.twohourremaindersent = true;
        await task.save();
      }

     
      if (
        diff <= 60 * 60 * 1000 &&
        diff > 30 * 60 * 1000 &&
        !task.onehourremaindersent
      ) {
    const messagerecieved=await sendEmail(
          user.email,
          "Task Reminder - 1 Hour Left",
          `Your task "${task.title}" is due in 1 hour.`
        );
        task.onehourremaindersent = true;
        await task.save();
        console.log("message",messagerecieved);
      }

      
      if (
        diff <= 30 * 60 * 1000 &&
        diff > 0 &&
        !task.thirtyminuteremaindersent
      ) {
        await sendEmail(
          user.email,
          "Task Reminder - 30 Minutes Left",
          `Your task "${task.title}" is due in 30 minutes.`
        );
        task.thirtyminuteremaindersent = true;
        await task.save();
      }

  
      if (diff <= 0 && !task.taskexpired) {
        await sendEmail(
          user.email,
          "Task Expired",
          `Your task "${task.title}" has expired.`
        );
        task.taskexpired = true;
        await task.save();
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});