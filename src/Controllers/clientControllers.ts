import { Request, Response } from "express";
import { ValidatorClient } from "../Schema/schemaClient";
import { InternalServerError } from "../Helpers/api-erros";
import { ClientService } from "../Services/clientServices";

export class ClientController {
  async registerClientController(req: Request, res: Response) {
    try {
      const payload = await ValidatorClient.registerClientValidator.validate(req.body);

      await ClientService.registerClientService(payload);

      return res.status(200).json({ message: "User successfully registered!" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async loginClientController(req: Request, res: Response) {
    try {
      const payload = await ValidatorClient.loginClientValidator.validate(req.body);

      const data = await ClientService.LoginClientService(payload);

      return res.status(200).json(data);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async updateClientController(req: Request, res: Response) {
    const id = req.params;

    try {
      const payload = await ValidatorClient.updateClientValidator.validate(req.body);

      await ClientService.updateClientService(payload, Number(id));

      return res.status(201).json({ message: "Successful update." });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async detailClientProfileController(req: Request, res: Response) {
    const id = req.params;

    try {
      const client = await ClientService.detailClientService(Number(id));

      return res.status(200).json(client);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteClientController(req: Request, res: Response) {
    const id = req.params;

    try {
      await ClientService.deleteClientService(Number(id));

      return res.status(201).json({ message: "Client successfully deleted" });
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
