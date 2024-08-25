import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    title: string;

    @Column('text')
    description: string;

    @Column('int')
    duration: number;

    @Column({length: 255})
    platform: string;

    @Column('float')
    rating: number;

    @Column({length: 255})
    category: string;

    @Column('decimal')
    price: number;

}
