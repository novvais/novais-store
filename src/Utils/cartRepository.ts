import { AppDataSource } from "../data-source";
import { Cart } from "../Model/Cart";

export const cartRepository = AppDataSource.getRepository(Cart);
