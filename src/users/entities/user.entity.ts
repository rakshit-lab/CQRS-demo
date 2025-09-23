import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio: string;
}