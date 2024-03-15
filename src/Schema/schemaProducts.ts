import vine from "@vinejs/vine";

export class ValidatorProduct {
  static registerValidator = vine.object({
    name: vine.string(),
    description: vine.string(),
    strock_quantity: vine.number(),
    price: vine.number(),
    categorie_id: vine.number(),
    product_image: vine.string()
  });

  static updateValidator = vine.object({
    name: vine.string().optional(),
    description: vine.string().optional(),
    strock_quantity: vine.number().optional(),
    price: vine.number().optional(),
    categorie_id: vine.number().optional(),
    product_image: vine.string().optional()
  })
}
