import { Client } from "./Client";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity({
  name: "carts",
})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  client_id: number

  @Column()
  product_id: number

  @Column()
  quantity: number

  @Column()
  total_price: number

  @Column()
  finished: boolean

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => Client, client => client.carts)
  @JoinColumn({ name: "client_id" })
  client: Client

  @OneToMany(() => Product, product => product.cart)
  @JoinColumn({ name: "product_id" })
  products: Product[]

  @OneToOne(() => Order, order => order.cart)
  order: Order
}