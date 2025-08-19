import jwt from "jsonwebtoken";

export const authenticates = (req: any, res: any, next: Function) => {
  const token = req.cookies.token; // cookie name from login

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, 'AJIT' as string) as { id: string };
    console.log("decoded",decoded);
    req.userId = decoded.id; // ✅ use _id from token and set userId
    console.log(req.userId = decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
