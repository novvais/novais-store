import { knex } from "../Connection/knex";
import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import { At } from "../Helpers/date";

interface RegisterProduct {
  name: string;
  description: string;
  stock_quantity?: number;
  price: number;
  categorie_id: number;
  product_image: string;
}

interface UpdateProduct {
  name?: string;
  description?: string;
  stock_quantity?: number;
  price?: number;
  categorie_id?: number;
  product_image?: string;
}

export class ProductService {
  static async registerProductService(payload: RegisterProduct) {
    const existingCategory = await knex("categories")
      .where({ id: payload.categorie_id })
      .whereNot({ deleted_at: null })
      .first();

    if (existingCategory) {
      throw new NotFoundError("The category indicated does not exist.");
    }

    const newProduct = await knex("products")
      .insert({
        name: payload.name,
        description: payload.description,
        stock_quantity: payload.stock_quantity,
        price: payload.price,
        categorie_id: payload.categorie_id,
        product_image: payload.product_image,
      })
      .returning(
        "name, description, stock_quantity, price, categorie_id, product_image"
      );

    return newProduct;
  }

  static async updateProductService(payload: UpdateProduct, id: number) {
    const product = await knex("products")
      .where({ id })
      .whereNot({ deleted_at: null })
      .first();

    if (!product) {
      throw new NotFoundError("Product not found.");
    }

    const categoriesId = await knex("categories")
      .where({ id: payload.categorie_id })
      .whereNot({ deleted_at: null })
      .first();

    if (!categoriesId) {
      throw new NotFoundError("Reported category does not exist.");
    }

    const updatedProduct = await knex("products")
      .update({
        name: payload.name,
        description: payload.description,
        stock_quantity: payload.stock_quantity,
        price: payload.price,
        categorie_id: payload.categorie_id,
        product_image: payload.product_image,
      })
      .where({ id })
      .returning("*");

    if (!updatedProduct) {
      throw new BadRequestError("Product cannot be updated");
    }
  }

  static async listProductsService(categorie_id?: number) {
    if (categorie_id === null) {
      const products = await knex("products");

      return products;
    }

    const categoriesId = await knex("categories")
      .where({ id: categorie_id })
      .whereNot({ deleted_at: null })
      .first();

    if (!categoriesId) {
      throw new NotFoundError("Reported category does not exist.");
    }

    if (categoriesId) {
      const productsFilter = await knex("products")
        .where({
          categorie_id,
        })
        .whereNot({ deleted_at: null });

      return productsFilter;
    }
  }

  static async datailProductService(id: number) {
    const product = await knex("products")
      .where({ id })
      .whereNot({ deleted_at: null })
      .first();

    if (!product) {
      throw new NotFoundError("Product not found.");
    }

    return product;
  }

  static async deleteProductService(id: number) {
    await At.deleteAt("products", id);
  }
}
