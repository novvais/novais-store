import { AppDataSource } from "../data-source"
import { Wishlist } from "../Model/Wishlist"

export const wishlistRepository = AppDataSource.getRepository(Wishlist)