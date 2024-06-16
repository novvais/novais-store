import * as yup from "yup";

export class ValidatorCart {
  static registerCartValidator = yup.object({
    client_id: yup.number().required(),
  });

  static registerItemsInCartValidator = yup.object({
    cart_id: yup.number().required(),
    product_id: yup.number().required(),
    quantity: yup.number().required(),
  });

  static updateItemsInCartValidator = yup.object({
    cart_id: yup.number().optional(),
    product_id: yup.number().optional(),
    quantity: yup.number().optional(),
  });
}
