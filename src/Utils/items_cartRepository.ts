import { AppDataSource } from "../data-source";
import { Items_Cart } from "../Model/Items_Cart";

export const items_cartRepository = AppDataSource.getRepository(Items_Cart);