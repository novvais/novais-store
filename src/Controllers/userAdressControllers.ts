import { Request, Response } from "express";
import { InternalServerError } from "../Helpers/api-erros";
import { CheckZipCode } from "../Helpers/checkZipCode";
import { ValidatorAdress } from "../Schema/schemaAdress";
import { UserAdressService } from "../Services/userAdressServices";

export class UserAdressController {
  static async registerAdresscontroller(req: Request, res: Response) {
    try {
      const adress = await CheckZipCode.consultZipCode;

      if (!req.body) {
        await UserAdressService.registerAdressService(adress);

        return res.status(200).json({ adress });
      }

      const payload = await ValidatorAdress.registerAdressValidator.validate(
        adress
      );

      res.status(200).json({ payload });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async updateAdressController(req: Request, res: Response) {
    try {
      const payload = await ValidatorAdress.updateAdressValidator.validate(
        req.body
      );

      await UserAdressService.updateAdressService(payload);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
