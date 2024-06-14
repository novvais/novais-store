import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "https://api.stripe.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer sk_test_51PNz7TJCUQmjt0BOki0aIzpGm7II7FQkduk9SSs1xUGcEp7rOKsso3pL6qcq1LDpOGg78HeBpNjmMHYNkuQktote00hW93Ctby`,
    "Stripe-Version": "2020-08-27",
  },
});

export { instanceAxios }
