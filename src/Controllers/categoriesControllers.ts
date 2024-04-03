import { Request, Response } from "express";
import { InternalServerError } from "../Helpers/api-erros";
import { CategoriesService } from "../Services/categorieServices";

export class CategoriesController {
  async listCategoriesController(_: Request, res: Response) {
    try {
      const categories = await CategoriesService.listCategoriesService();

      return res.status(200).json(categories);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const id = req.params;

    try {
      await CategoriesService.deleteCategoryService(Number(id));

      return res.status(201).json({ message: "Category successfully deleted" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
