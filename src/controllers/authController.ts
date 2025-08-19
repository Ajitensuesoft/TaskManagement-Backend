import { Request, Response } from 'express';
import User from '../models/usermodel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY =  'AJIT';

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  console.log("signup data",email,password,confirmPassword);
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashpassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      email,
      password_hash: hashpassword,
      role: 'local',
    });

    let data=await newUser.save();
    console.log("data",data);
    
    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This email is already registered."
      });
    }
    console.error("Signup error:", err);
    return res.status(500).json({
      message: "Something went wrong during signup."
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("emailpassowrd",email,password);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userexist:any = await User.findOne({ email });

    if (!userexist) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (userexist.role !== 'local') {
      return res.status(400).json({
        message: "This email is registered via a different method. Please use the appropriate login."
      });
    }

    if (!userexist.password_hash) {
      return res.status(500).json({ message: "User data is inconsistent." });
    }

    const isMatch = await bcrypt.compare(password, userexist.password_hash);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: userexist._id,
      email: userexist.email,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    const options: any = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    };
console.log("token",token);
res.cookie('token', token, options).json({
  message: "Signin successful",
  email:email,
  token:token,
  options:options
});
    // res.status(200).json({token:token});
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: 'Something went wrong during signin.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};