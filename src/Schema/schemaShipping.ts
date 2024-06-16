import * as yup from "yup";

export class ValidatorShipping {
  static calculateShippingValidator = yup.object({
    cart_id: yup.number().required(),
    zipCodeS: yup.string().required(),
    zipCodeD: yup.string().required(),
  });

  static registerShippingValidator = yup.object({
    cart_id: yup.number().required(),
    shipping: yup.string().required(),
    price: yup.number().required()
  })

  static updateShippingValidator = yup.object({
    cart_id: yup.number().optional(),
    shipping: yup.string().optional(),
    price: yup.number().optional()
  })
}
