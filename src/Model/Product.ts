import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { File } from "./Files";
import { Category } from "./Category";
import { Client_Verification } from "./Client_Verification";
import { Wishlist } from "./Wishlist";

@Entity({
  name: "products",
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  stock: number

  @Column()
  price: number

  @Column()
  size: string

  @Column()
  category_id: number

  @Column()
  image_id: number

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => Cart, cart => cart.products)
  cart: Cart

  @OneToMany(() => File, file => file.product)
  @JoinColumn({ name: "image_id" })
  files: File[]

  @OneToMany(() => Category, category => category.product)
  @JoinColumn({ name: "category_id" })
  categories: Category[]

  @ManyToOne(() => Client_Verification, client_verification => client_verification.products)
  client_verifications: Client_Verification

  @OneToMany(() => Wishlist, wishlist => wishlist.product)
  wishlists: Wishlist
}