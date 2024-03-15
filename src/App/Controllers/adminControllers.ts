import { Request, Response } from "express";
import vine from "@vinejs/vine";
import { ValidatorAdm } from "../../Schema/schemaAdm";
import { InternalServerError } from "../../Helpers/api-erros";
import { AdmService } from "../../Services/admServices";

export class AdmController {
  async registerAdm(req: Request, res: Response) {
    try {
      const payload = await vine.validate({
        schema: ValidatorAdm.registerAdmValidator,
        data: req.body,
      });

      await AdmService.registerAdmService(payload);

      return res
        .status(200)
        .json({ message: "Admin successfully registered!" });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async loginAdm(req: Request, res: Response) {
    try {
      const payload = await vine.validate({
        schema: ValidatorAdm.loginAdmValidator,
        data: req.body,
      });

      const data = await AdmService.loginAdmService(payload);

      return res.status(200).json(data);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async updateAdm(req: Request, res: Response) {
    const id = req.params;

    try {
      const payload = await vine.validate({
        schema: ValidatorAdm.updateAdmValidator,
        data: req.body,
      });

      await AdmService.updateAdmService(payload, Number(id));

      return res.status(200).json({ message: "Successful update!" });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async detailAdmProfile(req: Request, res: Response) {
    const id = req.params;

    try {
      const admValidate = await AdmService.detailAdmService(Number(id));

      return res.status(200).json({
        id: admValidate.id,
        name: admValidate.name,
        email: admValidate.email,
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteAdm(req: Request, res: Response) {
    const id = req.params;

    try {
      await AdmService.deleteAdmService(Number(id));

      return res.status(201).json({ message: "Admin successfully deleted" });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
