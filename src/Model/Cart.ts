import { Client } from "./Client";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Items_Cart } from "./Items_Cart";

@Entity({
  name: "carts",
})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Client, (client) => client.carts)
  @JoinColumn({ name: "client_id" })
  client: Client;

  @OneToMany(() => Items_Cart, (items_cart) => items_cart.cart)
  items_carts: Items_Cart;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}
