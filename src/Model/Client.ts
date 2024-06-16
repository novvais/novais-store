import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Client_Address } from "./Client_Address";
import { Wishlist } from "./Wishlist";

@Entity({
  name: "clients",
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  birth_date: Date;

  @Column()
  created_at: Date;

  @Column({ })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Cart, (cart) => cart.client)
  carts: Cart[];

  @OneToMany(() => Client_Address, (address) => address.client)
  client_addresses: Client_Address[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.client)
  wishlists: Wishlist;
}
