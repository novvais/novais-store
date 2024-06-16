import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({
  name: "categories",
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date

  @OneToMany(() => Product, (product) => product.categories)
  product: Product
}