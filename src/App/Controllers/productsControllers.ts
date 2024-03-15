import { Request, Response } from "express";
import knex from "knex";
import vine from "@vinejs/vine";
import { ValidatorProduct } from "../../Schema/schemaProducts";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../Helpers/api-erros";
import { ProductService } from "../../Services/productServices";

export const registerProductController = async (req: Request, res: Response) => {

  try {
    const payload = await vine.validate({ schema: ValidatorProduct.registerValidator, data: req.body });

    const newProduct = await ProductService.registerProductService(payload)
    
    return res.status(201).json(newProduct)
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payload = await vine.validate({ schema: ValidatorProduct.updateValidator, data: req.body });

    const updateProduct = await ProductService.updateProductService(payload, Number(id))

    return res.status(201).json(updateProduct);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const listProductsController = async (req: Request, res: Response) => {
  const { categorie_id } = req.query;

  try {
    if (!categorie_id) {
      const products = await ProductService.listProductsService()

      return res.status(200).json(products)
    }

    const productsFilter = await ProductService.listProductsService(Number(categorie_id))
    
    return res.status(200).json(productsFilter);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const detailProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Perguntar se posso deixar somente o listProducts
  try {
    const product = await ProductService.deleteProductService(Number(id))

    return res.status(200).json(product);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await ProductService.deleteProductService(Number(id))

    return res.status(201).json({ message: "Product successfully deleted" })
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
