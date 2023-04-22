import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const jwtExpirySeconds = 60 * 60 * 60 * 60 * 60;
export const loginByGoogleToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const clientId = process.env["GOOGLE_CLIENT_ID"];
    const jwtSecretKey = process.env["JWT_SECRET_KEY"];
    if (!clientId || !jwtSecretKey) return;
    const client = new OAuth2Client(clientId);
    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    // Get the JSON with all the user info
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.name || !payload.picture) {
      res.status(401).send({ message: "invalid token" });
      return;
    }

    const user = await prisma.user.upsert({
      where: { email: payload?.email },
      create: {
        email: payload.email,
        name: payload.name,
        image: payload.picture,
      },
      update: {},
      select: { id: true, email: true },
    });

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecretKey,
      {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      }
    );

    res.cookie("access_token", jwtToken, { httpOnly: true }).status(200).send();
  } catch (err) {
    res.status(401).send({ message: "invalid token" });
  }
};
