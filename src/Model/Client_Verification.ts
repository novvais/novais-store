import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({
  name: "client_verifications",
})
export class Client_Verification {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  product_id: number

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => Product, (product) => product.client_verification)
  @JoinColumn({ name: "product_id" })
  products: Product[]
}