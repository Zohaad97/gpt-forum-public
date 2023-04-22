import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();
export interface CustomRequest extends Request {
  userId: string | JwtPayload;
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    console.log({ token });
    if (!token) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }

    const decoded: any = jwt.verify(token, process.env["JWT_SECRET_KEY"] || "");
    if (!decoded.id || !decoded.email) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: { id: true },
    });
    if (!user) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    req.params["client_id"] = user?.id || "";

    next();
  } catch (err) {
    res.status(401).send({ message: String(err) });
  }
};
