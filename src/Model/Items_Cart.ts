import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Entity({
  name: "items_cart",
})
export class Items_Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.items_carts)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.items_cart)
  @JoinColumn({ name: "product_id" })
  products: Product[];
}
