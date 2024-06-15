import { AppDataSource } from "../data-source";
import { Category } from "../Model/Category";

export const categoryRepository = AppDataSource.getRepository(Category);
