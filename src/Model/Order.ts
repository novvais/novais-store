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
  cart_id: number

  @Column()
  total_price: number

  @Column()
  transaction_id: string

  @Column({ default: false })
  finished: boolean

  @Column({ default: false })
  refund: boolean

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @OneToOne(() => Cart, cart => cart.order)
  @JoinColumn({ name: "cart_id" })
  cart: Cart
}