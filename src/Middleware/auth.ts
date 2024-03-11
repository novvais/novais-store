import { Request, Response, NextFunction } from 'express';
import knex from "knex"
import jwt from "jsonwebtoken"

const checkLoggedUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JW_SECRET);

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(401).json({ message: "Not authorized." });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { checkLoggedUser };
