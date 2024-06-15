import { instanceGatewayAxios } from "../Api/axios";
import qs from "qs";
import { ICard } from "../Interfaces/interfaceStripe";
import { InternalServerError } from "../Helpers/api-erros";

export class Stripe {
  static async createToken(card: ICard) {
    const dataCard = qs.stringify(card);

    console.log(dataCard)

    try {
      const { data: tokenCard } = await instanceGatewayAxios.post("/tokens", dataCard);

      return tokenCard;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  static async payments(amount: number, token: string) {
    const dataPayments = qs.stringify({
      amount,
      currency: "brl",
      source: token,
    });

    try {
      const { data: cobrança } = await instanceGatewayAxios.post(
        "/charges",
        dataPayments
      );

      return cobrança;
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  static async refund(transaction_id: string) {
    const dataRefund = qs.stringify({
      charge: transaction_id
    })

    try {
      const { data: refund } = await instanceGatewayAxios.post("/refunds", dataRefund)

      return refund
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }
}
