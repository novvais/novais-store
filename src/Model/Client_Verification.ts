import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({
  name: "clients_verification",
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

  @OneToMany(() => Product, product => product.client_verifications)
  @JoinColumn({ name: "product_id" })
  products: Product[]
}