import { Shipping_Cart } from "../Model/shipping_cart";
import { AppDataSource } from "../data-source";

export const shipping_cartRepository = AppDataSource.getRepository(Shipping_Cart)