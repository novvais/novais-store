import { Request, Response } from "express";
import { ValidatorAdm } from "../Schema/schemaAdm";
import { InternalServerError } from "../Helpers/api-erros";
import { AdmService } from "../Services/admServices";

export class AdmController {
  async registerAdm(req: Request, res: Response) {
    try {
      const payload = await ValidatorAdm.registerAdmValidator.validate(req.body);

      await AdmService.registerAdmService(payload);
      
      return res
        .status(200)
        .json({ message: "Admin successfully registered!" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async loginAdm(req: Request, res: Response) {
    try {
      const payload = await ValidatorAdm.loginAdmValidator.validate(req.body);

      const data = await AdmService.loginAdmService(payload);

      return res.status(200).json(data);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async updateAdm(req: Request, res: Response) {
    const id = req.params;

    try {
      const payload = await ValidatorAdm.updateAdmValidator.validate(req.body);

      await AdmService.updateAdmService(payload, Number(id));

      return res.status(200).json({ message: "Successful update!" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async detailAdmProfile(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const admValidate = await AdmService.detailAdmService(Number(id));

      return res.status(200).json(admValidate);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteAdm(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await AdmService.deleteAdmService(Number(id));

      return res.status(201).json({ message: "Admin successfully deleted" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
