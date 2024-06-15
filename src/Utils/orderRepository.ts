import { AppDataSource } from "../data-source";
import { Order } from "../Model/Order";

export const orderRepository = AppDataSource.getRepository(Order);
