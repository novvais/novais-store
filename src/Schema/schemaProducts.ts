import vine from "@vinejs/vine";

const registerAndUpValidator = vine.object({
  description: vine.string(),
  strock_quantity: vine.number(),
  value: vine.number(),
  categorie_id: vine.number(),
  product_image: vine.string()
});

export { registerAndUpValidator };
