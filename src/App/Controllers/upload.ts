import { Request, Response } from "express";
import { upload } from "../../storage";

const file = async (req: Request, res: Response) => {
  const { file } = req;

  try {
    const arquivos = await upload(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    );

    return res.status(201).json(arquivos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export { file }
