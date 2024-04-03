import { Request, Response } from "express";
// import { upload } from "../storage";

export class fileController {
  async uploadController(req: Request, res: Response) {
    // const { file } = req;

    // try {
    //   const arquivos = await upload(
    //     `imagens/${file.originalname}`,
    //     file.buffer,
    //     file.mimetype
    //   );

    //   return res.status(201).json(arquivos);
    // } catch (error: any) {
    //   return res.status(400).json(error.message);
    // }
  }

  async filesController(req: Request, res: Response) {}
}
