import vine from "@vinejs/vine";

const registerClientValidator = vine.object({
  name: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const loginClientValidator = vine.object({
  email: vine.string(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const updateClientValidator = vine.object({
  name: vine.string().optional(),
  cpf: vine
    .string()
    .regex(/^\d{11}$/)
    .optional(),
  username: vine.string().optional(),
  password: vine.string().minLength(8).maxLength(32).confirmed().optional(),
});

export { registerClientValidator, updateClientValidator, loginClientValidator };