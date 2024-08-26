import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usermedia')
export class UserMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.id, {eager: true})
    user: User //REVISAR!

    @Column()
    video: string; //cambiar!!!
    
}
