import vine from "@vinejs/vine";

const registerAdmValidator = vine.object({
  name: vine.string(),
  cpf: vine.string().regex(/^\d{11}$/),
  username: vine.string(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const loginAdmValidator = vine.object({
  username: vine.string(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

const updateAdmValidator = vine.object({
  name: vine.string().optional(),
  cpf: vine
    .string()
    .regex(/^\d{11}$/)
    .optional(),
  username: vine.string().optional(),
  password: vine.string().minLength(8).maxLength(32).confirmed().optional(),
});

export { registerAdmValidator, updateAdmValidator, loginAdmValidator };
