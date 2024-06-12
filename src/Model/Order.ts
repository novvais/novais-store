import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Client } from "./Client";

@Entity({
  name: "orders",
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  client_id: number
  
  @Column()
  cart_id: number

  @Column()
  total_price: number

  @Column()
  transaction_id: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => Client, client => client.orders)
  @JoinColumn({ name: "client_id" })
  client: Client

  @OneToOne(() => Cart, cart => cart.order)
  @JoinColumn({ name: "cart_id" })
  cart: Cart
}