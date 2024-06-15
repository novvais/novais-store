import axios from "axios";

const instanceGatewayAxios = axios.create({
  baseURL: "https://api.stripe.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${process.env.TOKEN_STRIPE}`,
    "Stripe-Version": "2020-08-27",
  },
});

const instanceEnvioAxios = axios.create({
  baseURL: "https://sandbox.melhorenvio.com.br/api/v2/me",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer ${process.env.TOKEN_MELHORE}`,
  },
});

export { instanceGatewayAxios, instanceEnvioAxios };
