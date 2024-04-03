import { Request, Response } from "express";
import { CartServices } from "../Services/cartServices"
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../Helpers/api-erros";

export class CartController {
  async registerCartController(req: Request, res: Response) {

    try {
      const payload = req.body

      await CartServices.registerCartService(payload);
    } catch (error: any) {
      throw new InternalServerError(error.message)
    }
  }

  async updateCartController(req: Request, res: Response) {}

  async listCartController(req: Request, res: Response) {

  }

  async deleteCartController(req: Request, res: Response) {
    
  }
}
