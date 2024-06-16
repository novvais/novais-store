import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "shipping_carts",
})
export class Shipping_Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: number;

  @Column()
  shipping: string;

  @Column()
  price: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
