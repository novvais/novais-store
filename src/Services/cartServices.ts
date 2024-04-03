import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import knex from "knex";

interface RegisterCart {
  client_id: number;
  observation: string;
  cart_products: [
    {
      product_id: number;
      product_quantity: number;
    }
  ];
}

interface UpdateCart {
  client_id?: number;
  observation?: string;
  cart_products?: {
    product_id?: number;
    product_quantity?: number;
  };
}

interface ConfirmedProducts {
  product_id: number;
  product_quantity: number;
  product_price: number;
}

export class CartServices {
  static async registerCartService(payload: RegisterCart) {
    const validateClient = await knex("clients")
      .where({ id: payload.client_id })
      .where({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Client not found!");
    }

    let productNotStock: number[] = [];

    let confirmedProducts: ConfirmedProducts[] = [];

    let totalPrice: number = 0;

    for (const product of payload.cart_products) {
      const { product_id, product_quantity } = product;

      const validateProduct = await knex("products")
        .where({ id: product_id })
        .where({ deleted_at: null })
        .first();

      if (!validateProduct) {
        throw new NotFoundError("Product not found!");
      }

      if (product_quantity > validateProduct.product_quantity) {
        productNotStock.push(product.product_id);
      }

      const priceProduct = await knex("products")
        .select("price")
        .where({ id: product.product_id })
        .first();

      totalPrice += priceProduct.price;

      confirmedProducts.push({
        product_id,
        product_quantity,
        product_price: priceProduct.price,
      });

      const cartData = await knex("carts")
        .insert({
          client_id: payload.client_id,
          observation: payload.observation,
          total_price: totalPrice,
        })
        .returning("*");

      for (let i = 0; i < confirmedProducts.length; i++) {
        await knex("orders").insert({
          cart_id: cartData[0].id,
          product_id: confirmedProducts[i].product_id,
          product_quantity: confirmedProducts[i].product_quantity,
          product_price: confirmedProducts[i].product_price,
        });
      }

      return
    }
  }

  static async listCartService(id: number) {
    const validateClient = await knex("orders")
      .where({ client_id: id })
      .first();
  }

  static async deleteCartService(id: number) {}
}
