import * as yup from "yup";

export class ValidatorProduct {
  static registerValidator = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    stock: yup.number().required(),
    price: yup.number().required(),
    size: yup.string().required(),
    category_id: yup.number().required(),
    image_id: yup.number().optional(),
    width: yup.number().required(),
    height: yup.number().required(),
    length: yup.number().required(),
    weight: yup.number().required()
  });

  static updateValidator = yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
    strock: yup.number().optional(),
    price: yup.number().optional(),
    size: yup.string().optional(),
    category_id: yup.number().optional(),
    image_id: yup.number().optional(),
    width: yup.number().optional(),
    height: yup.number().optional(),
    length: yup.number().optional(),
    weight: yup.number().optional()
  })
}
