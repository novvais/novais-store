import { AppDataSource } from "../data-source";
import { Product } from "../Model/Product";

export const productRepository = AppDataSource.getRepository(Product);
