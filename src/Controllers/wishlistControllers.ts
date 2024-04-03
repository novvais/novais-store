import { Request, Response } from "express";
import { WishlistServices } from "../Services/wishlistServices";
import { InternalServerError } from "../Helpers/api-erros";

export class WishlistController {
  async registerWhishlistController(req: Request, res: Response) {
    try {
      const payload = req.body;

      await WishlistServices.registerWishlistService(payload);

      return res
        .status(201)
        .json({ message: "Wishlist successfully registered!" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async listWishlistControllers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const wishlistData = await WishlistServices.listWishlistService(
        Number(id)
      );

      return res.status(200).json(wishlistData);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteWishlistControllers(req: Request, res: Response) {
    try {
      const { id } = req.query;

      await WishlistServices.listWishlistService(Number(id));

      return res.status(201).json({ message: "Product successfully deleted from wishlist" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
