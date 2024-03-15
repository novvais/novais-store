import { Request, Response } from "express";
import knex from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vine from "@vinejs/vine";
import {
  registerAdmValidator,
  updateAdmValidator,
  loginAdmValidator,
} from "../../Schema/schemaAdm";

const registerAdm = async (req: Request, res: Response) => {
  const { name, cpf, username, password } = req.body;

  

  try {
    await vine.validate({ schema: registerAdmValidator, data: req.body });

    const admValidate = await knex("admin").where({ cpf }).first();

    if (admValidate) {
      return res.status(400).json({ message: "CPF already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const admData = await knex("users")
      .insert({
        name,
        cpf,
        username,
        password: encryptedPassword,
      })
      .returning("*");

    if (!admData) {
      return res.status(400).json({ message: "Unable to register admin." });
    }

    return res.status(200).json({ message: "Admin successfully registered!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginAdm = async (req: Request, res: Response) => {
  const { cpf, password } = req.body;

  try {
    await vine.validate({ schema: loginAdmValidator, data: req.body });

    const admValidateL = await knex("users").where({ cpf }).first();

    if (!admValidateL) {
      return res.status(404).json({ message: "Invalid CPF and/or password." });
    }

    const validPasswordL = await bcrypt.compare(
      password,
      admValidateL.password
    );

    if (!validPasswordL) {
      return res
        .status(400)
        .json({ message: "Invalid username and/or password." });
    }

    const token = jwt.sign({ id: admValidateL.id }, process.env.JW_SECRET, {
      expiresIn: "8h",
    });

    const { password: _, ...loginAdm } = admValidateL;

    return res.status(200).json({ ...loginAdm, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAdm = async (req: Request | any, res: Response) => {
  const id = req.user.id;
  const { name, cpf, username, password } = req.body;

  try {
    await vine.validate({ schema: updateAdmValidator, data: req.body });

    const admValidateU = await knex("admin").where({ cpf });

    if (admValidateU) {
      return res.status(400).json({ message: "CPF already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const admDataU = await knex("users")
      .where({ id })
      .update({
        name,
        cpf,
        username,
        password: encryptedPassword,
      })
      .returning("*");

    if (!admDataU) {
      return res.status(400).json({ message: "Unable to register admin." });
    }

    return res.status(200).json({ message: "Successful update!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detailAdmProfile = async (req: Request | any, res: Response) => {
  const id = req.user.id;

  try {
    const admValidateP = await knex("admin").where({ id }).first();

    if (!admValidateP) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      id: admValidateP.id,
      name: admValidateP.name,
      email: admValidateP.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAdm = async (req: Request, res: Response) => {};

export { registerAdm, loginAdm, updateAdm, detailAdmProfile, deleteAdm };
