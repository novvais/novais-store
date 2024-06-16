import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./Files";
import { Category } from "./Category";
import { Client_Verification } from "./Client_Verification";
import { Wishlist } from "./Wishlist";
import { Items_Cart } from "./Items_Cart";

@Entity({
  name: "products",
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  category_id: number;

  @Column({ nullable: true })
  image_id: number;

  @Column()
  width: number

  @Column()
  height: number

  @Column()
  length: number

  @Column()
  weight: number

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Items_Cart, (item_cart) => item_cart.products)
  items_cart: Items_Cart;

  @OneToMany(() => File, (file) => file.product)
  @JoinColumn({ name: "image_id" })
  files: File[];

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: "category_id" })
  categories: Category[];

  @OneToMany(
    () => Client_Verification,
    (client_verification) => client_verification.products
  )
  client_verification: Client_Verification;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist;
}
