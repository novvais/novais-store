import { Request, Response } from "express";
import { ValidatorProduct } from "../Schema/schemaProducts";
import { InternalServerError } from "../Helpers/api-erros";
import { ProductService } from "../Services/productServices";

export class ProductController {
  async registerProductController(req: Request, res: Response) {
    try {
      const payload = await ValidatorProduct.registerValidator.validate(req.body);

      const newProduct = await ProductService.registerProductService(payload);

      return res.status(201).json(newProduct);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async updateProductController(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const payload = await ValidatorProduct.updateValidator.validate(req.body);

      const updateProduct = await ProductService.updateProductService(
        payload,
        Number(id)
      );

      return res.status(201).json(updateProduct);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async listProductsController(req: Request, res: Response) {
    const { categorie_id } = req.query;

    try {
      if (!categorie_id) {
        const products = await ProductService.listProductsService();

        return res.status(200).json(products);
      }

      const productsFilter = await ProductService.listProductsService(
        Number(categorie_id)
      );

      return res.status(200).json(productsFilter);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async detailProductController(req: Request, res: Response) {
    const { id } = req.params;

    // Perguntar se posso deixar somente o listProducts
    try {
      const product = await ProductService.deleteProductService(Number(id));

      return res.status(200).json(product);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteProductController(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await ProductService.deleteProductService(Number(id));

      return res.status(201).json({ message: "Product successfully deleted" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
