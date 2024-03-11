import { Request, Response } from "express";
import knex from "knex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vine from "@vinejs/vine";
import {
  registerClientValidator,
  updateClientValidator,
  loginClientValidator,
} from "../../Schema/schemaClient";

const registerClient = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    await vine.validate({ schema: registerClientValidator, data: req.body });

    const client = await knex("users").where({ email }).first();

    if (client) {
      return res.status(400).josn({ message: "E-mail already registered" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const clientData = await knex("users")
      .insert({
        name,
        email,
        password: encryptedPassword,
      })
      .returning("*");

    if (!clientData) {
      return res.status(400).json({ message: "Unable to register user." });
    }

    return res.status(200).json({ message: "User successfully registered!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await vine.validate({ schema: loginClientValidator, data: req.body });

    const validateClient = await knex("users").where({ email }).first();

    if (!validateClient) {
      return res
        .status(404)
        .json({ message: "Invalid email and/or password." });
    }

    const validPassword = await bcrypt.compare(password, validateClient.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email and/or password." });
    }

    const token = jwt.sign({ id: validateClient.id }, process.env.JW_SECRET, {
      expiresIn: "8h",
    });

    const { password: _, ...loginClient } = validateClient;

    return res.status(200).json({ ...loginClient, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detailClientProfile = async (req: Request, res: Response) => {
  const id = req.user.id;

  try {
    const client = await knex("users").where({ id }).first();

    if (!client) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ id: client.id, name: client.name, email: client.email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateClient = async (req: Request, res: Response) => {
  const id = req.usuario.id;
  const { name, email, password } = req.body;

  try {
    await vine.validate({ schema: updateClientValidator, data: req.body });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const updatedClient = await knex("users").where({ id }).update({
      name,
      email,
      password: encryptedPassword,
    });

    if (!updatedClient) {
      return res.status(400).json({ message: "Unable to update user" });
    }

    return res.status(201).json({ message: "Successful update." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req: Request, res: Response) => {
  const id = req.usuario.id;

  try {
    const deletedClient = await knex("users").where({ id }).first();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerClient, loginClient, detailClientProfile, updateClient, deleteClient };
