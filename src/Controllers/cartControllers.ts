import { Request, Response } from "express";
import { CartServices } from "../Services/cartServices";
import { InternalServerError } from "../Helpers/api-erros";

export class CartController {
  async registerCartController(req: Request, res: Response) {
    try {
      const payload = req.body;

      await CartServices.registerCartService(payload);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async updateCartController(req: Request, res: Response) {
    try {
      const payload = req.body;

      await CartServices.updateCartService(payload);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async listCartController(req: Request, res: Response) {
    const id = req.params;

    try {
      const validateClient = await CartServices.listCartService(Number(id));

      return res.status(200).json(validateClient);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteCartController(req: Request, res: Response) {
    const id = req.params;

    try {
      await CartServices.deleteCartService(Number(id));

      return res.status(201).json({ message: "Cart successfully deleted" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
