import * as yup from "yup";

export class WishlistValidator {
  static registerWishlistValidator = yup.object({
    client_id: yup.number().required(),
    product_id: yup.number().required(),
  });
}
