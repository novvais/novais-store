import { calcularPrecoPrazo, consultarCep } from "correios-brasil";
import { IRegisterAdress } from "../interfaces/interfaceUserAdress";

export class CheckZipCode {
  static async consultZipCode(zipCode: IRegisterAdress | any) {
    // Cep pode ser String ou Number
    // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve

    const adress = consultarCep(zipCode).then((response) => {
      console.log(response);
    });

    return adress;
  }

  static async calculateFreight(zipCodeO: string, zipCodeD: string) {
    let args = {
      sCepOrigem: zipCodeO,
      sCepDestino: zipCodeD,
      nVlPeso: process.env.NVL_WIGHT,
      nCdFormato: process.env.NVL_FORMAT,
      nVlComprimento: process.env.NVL_LENGTH,
      nVlAltura: process.env.NVL_HEIGHT,
      nVlLargura: process.env.NVL_WIDTH,
      nCdServico: process.env.NCD_SERVICES,
      nVlDiametro: process.env.NVL_DIAMETER,
    };

    calcularPrecoPrazo(args).then((response) => {
      console.log(response);
    });
  }
}
