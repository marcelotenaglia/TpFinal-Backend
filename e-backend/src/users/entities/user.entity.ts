import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 255})
    name: string;

    @Column('varchar', {length: 255})
    email: string;

    @Column('date')
    birthdate: Date;

}
