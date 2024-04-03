import { BadRequestError, NotFoundError } from "../Helpers/api-erros";
import { knex } from "../Connection/knex";

interface RegisterWishlist {
  client_id: number;
  product_id: number;
}

export class WishlistServices {
  static async registerWishlistService(payload: RegisterWishlist) {
    const validateClient = await knex("clients")
      .where({ id: payload.client_id })
      .where({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Client not found!");
    }

    const wishlistData = await knex("wishlist")
      .insert({
        client_id: payload.client_id,
        product_id: payload.product_id,
        created_at: new Date(),
      })
      .returning("*");

    if (!wishlistData) {
      throw new BadRequestError("Unable to register wishlist.");
    }
  }

  static async listWishlistService(id: number) {
    const validateClient = await knex("clients")
      .where({ id })
      .where({ deleted_at: null })
      .first();

    if (!validateClient) {
      throw new NotFoundError("Client not found!");
    }

    const wishlistData = await knex("wishlists")
      .where({ client_id: id })
      .where({ deleted_at: null })
      .first();

    return wishlistData
  }

  static async deleteWishlistService (id: number[]) {
    if (id.isArray()) {
        for (const i of id) {
            await knex("wishlists").where({ product_id: i }).update({ deleted_at: new Date() });
        }
    } else {
        await knex("wishlists").where({ product_id: id }).update({ deleted_at: new Date() });
    }
  }
}
