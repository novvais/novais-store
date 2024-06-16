import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "admins",
})
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  cpf: string

  @Column()
  password: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date
}
