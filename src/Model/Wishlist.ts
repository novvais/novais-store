import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Client } from "./Client";

@Entity({
  name: "wishlists",
})
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  client_id: number

  @Column()
  product_id: number

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => Client, client => client.wishlists)
  @JoinColumn({ name: "client_id" })
  client: Client

  @ManyToOne(() => Product, product => product.wishlists)
  @JoinColumn({ name: "product_id" })
  product: Product
}