import { knex } from "../Connection/knex";
import { BadRequestError, NotFoundError } from "../Helpers/api-erros"
import { IRegisterCart, IUpdateCart } from "../interfaces/interfaceCart"

export class CartServices {
  static async registerCartService(payload: IRegisterCart) {
    const validateClient = await knex("clients")
      .where({ id: payload.client_id })
      .where({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Client not found!");
    }

    const validateProduct = await knex("products")
      .where({ id: payload.product_id })
      .where({ deleted_at: null })
      .first();

    if (!validateProduct) {
      throw new NotFoundError("Product not found!");
    }

    if (payload.product_quantity > validateProduct.product_quantity) {
      throw new BadRequestError("Not enough stock of this product"); // PERGUNTAR SE PRECISA VERIFICAR ESSA PARTE, POIS PRODUTOS SEM ESTOQUE JÁ APRECEM NO SITE QUE NAO TEM ESTOQUE
    }

    const priceProduct = await knex("products")
      .select("price")
      .where({ id: payload.product_id })
      .first();

    const dataCart = await knex("carts")
      .where({ id: payload.client_id })
      .insert({
        client_id: payload.client_id,
        product_id: payload.product_id,
        quantity: payload.product_quantity,
        total_price: priceProduct,
        finished: false,
        created_at: new Date(),
        update_at: new Date()
      });

    return dataCart;
  }

  static async updateCartService(payload: IUpdateCart) {
    const validateClient = await knex("clients")
      .where({ id: payload.client_id })
      .where({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Client not found!");
    }

    const validateProduct = await knex("products")
      .where({ id: payload.product_id })
      .where({ deleted_at: null })
      .first();

    if (!validateProduct) {
      throw new NotFoundError("Product not found!");
    }

    const productInCart = await knex("carts")
      .where({ client_id: payload.client_id })
      .where({ product_id: payload.product_id })
      .first();

    if (
      payload.product_quantity + productInCart.quantity >
      validateProduct.product_quantity
    ) {
      throw new BadRequestError("Not enough stock of this product"); 
    }

    const priceProduct = await knex("products")
      .select("price")
      .where({ id: payload.product_id })
      .first();

    const dataCart = await knex("carts")
      .where({ id: payload.client_id })
      .insert({
        client_id: payload.client_id,
        product_id: payload.product_id,
        quantity: payload.product_quantity + productInCart.quantity,
        total_price: priceProduct + productInCart.total_price,
        finished: false,
        update_at: new Date()
      });

      return dataCart
  }

  static async listCartService(id: number) {
    const validateClient = await knex("carts")
      .where({ id })
      .first();

    return;
  }

  static async deleteCartService(id: number) {
    await knex("carts").where({ id }).update({ deleted_at: new Date() });
  }
}
