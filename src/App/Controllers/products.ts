import { Request, Response } from "express";
import knex from "knex";
import vine from "@vinejs/vine";
import { registerAndUpValidator } from "../../Schema/schemaProducts";
import { upload } from "../../storage"

const registerProduct = async (req: Request, res: Response) => {
  const { description, stock_quantity, value, categorie_id, product_image } =
    req.body;

  try {
    await vine.validate({ schema: registerAndUpValidator, data: req.body });

    const existingCategory = await knex("categories")
      .where({ id: categorie_id })
      .first();

    if (existingCategory) {
      return res
        .status(500)
        .json({ message: "The category indicated does not exist." });
    }

    const newProduct = {
      description,
      stock_quantity,
      value,
      categorie_id,
      product_image,
    };

    const productID = await knex("products").insert(newProduct).returning("*");

    return res.status(201).json(productID[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, stock_quantity, value, categorie_id, product_image } =
    req.body;

  try {
    await vine.validate({ schema: registerAndUpValidator, data: req.body });

    const product = await knex("products").where({ id }).first();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const categoriesId = await knex("categories")
      .where({ id: categorie_id })
      .first();

    if (!categoriesId) {
      return res
        .status(404)
        .json({ message: "Reported category does not exist." });
    }

    const data = {
      description,
      stock_quantity,
      value,
      categorie_id,
      product_image,
    };

    const updatedProduct = await knex("products")
      .update(data)
      .where({ id })
      .returning("*");

    if (!updatedProduct) {
      return res.status(400).json({ message: "Product cannot be updated" });
    }

    return res.status(201).json({ message: "Successful update." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listProduct = async (req: Request, res: Response) => {
    const { categorie_id } = req.query;

    try {
      // Fazer o Filtro no list

      if (!categorie_id) {
        const products = await knex("products");
        return res.status(200).json(products);
      }
  
      const categoriesId = await knex("categories")
        .where({ id: `${categorie_id}` })
        .first();
  
      if (!categoriesId) {
        return res
          .status(404)
          .json({ message: "Reported category does not exist." });
      }
  
      if (categoriesId) {
        const productsFilter = await knex("products").where({
          categorie_id: `${categorie_id}`,
        });
        return res.status(200).json(productsFilter);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const detailProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const product = await knex("products").where({ id }).first();
  
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const product = await knex("products").where({ id }).first();
  
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      const productOnOrder = await knex("order_products")
        .where({ product_id: id })
        .first();
  
      if (productOnOrder) {
        return res.status(409).json({ message: "product cannot be deleted" });
      }
  
      const imgPathQueryResult = await knex("products")
        .where({ id })
        .select("product_image");
  
      const imgPath =
        imgPathQueryResult.length > 0
          ? imgPathQueryResult[0].product_image
          : null;
  
      // if (imgPath) {
      //   const keyProductImage = imgPath.split(".com/");
      //   await upload.deleteF(keyProductImage[1]);
      // }
  
      await knex("products").del().where({ id });
  
      return res.json({ message: "Product successfully deleted!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

export {
  registerProduct,
  updateProduct,
  listProduct,
  detailProduct,
  deleteProduct,
};
