import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({
  name: "files",
})
export class File {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  original_name: string

  @Column()
  extname: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date
  
  @ManyToOne(() => Product, product => product.files)
  product: Product
}