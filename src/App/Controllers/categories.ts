import { Request, Response } from "express";
import knex from "knex";

const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await knex("categories");

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { listCategories };
