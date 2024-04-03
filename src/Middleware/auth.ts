import { Request, Response, NextFunction } from "express";
import { knex } from "../Connection/knex";
import jwt from "jsonwebtoken";
import { InternalServerError } from "../Helpers/api-erros";

export async function Auth(req: any, res: Response, next: NextFunction) {
  const { authrization } = req.headers;

  if (!authrization) {
    return res.status(401).json({ error: "Token" });
  }

  const [, token] = String(authrization).split(" ");

  try {
    const id  = jwt.verify(token, process.env.JW_SECRET || "");

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(401).json({ message: "Not authorized." });
    }

    req.userID = user;

    next();
  } catch (error) {
    throw new InternalServerError(error.message);
  }
}
