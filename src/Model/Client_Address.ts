import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity({
  name: "clients_addresses",
})
export class Client_Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number

  @Column()
  cep: string

  @Column()
  street: string

  @Column()
  address: string

  @Column()
  residencial_number: string

  @Column({ nullable: true })
  complement: string

  @Column()
  district: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @Column({ nullable: true })
  deleted_at: Date 

  @ManyToOne(() => Client, client => client.client_addresses)
  @JoinColumn({ name: "client_id" })
  client: Client
}