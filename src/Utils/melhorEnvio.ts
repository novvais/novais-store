import { instanceEnvioAxios } from "../Api/axios";
import { InternalServerError } from "../Helpers/api-erros";
import { IPropertiesLengths } from "../Interfaces/interfaceMelhorEnvio";


export class MelhorEnvio {
  static async calculateShipping(zipCodeS: string, zipCodeD: string, product: 
IPropertiesLengths[]) {


    try {
        const { data: shipping } = await instanceEnvioAxios.post("/shipment/calculate", {
            zipCodeS,
            zipCodeD,
            product
        })

        return shipping
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
