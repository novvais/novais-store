import * as yup from "yup";

export class ValidatorProduct {
  static registerValidator = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    strock_quantity: yup.number().required(),
    price: yup.number().required(),
    categorie_id: yup.number().required(),
    product_image: yup.string().required()
  });

  static updateValidator = yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
    strock_quantity: yup.number().optional(),
    price: yup.number().optional(),
    categorie_id: yup.number().optional(),
    product_image: yup.string().optional()
  })
}
