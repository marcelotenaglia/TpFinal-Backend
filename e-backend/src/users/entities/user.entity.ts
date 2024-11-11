import { BuyCourse } from "src/buy_courses/entities/buy_course.entity";
import { Course } from "src/courses/entities/course.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 255})
    name: string;

    @Column('varchar',{ unique: true, length: 255 })
    email: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column({type: 'boolean', default: true})
    disable: boolean;

    @Column({ type: 'varchar', length: 60 }) 
    password: string;
    
    @Column({ type: 'date', nullable: true })
    deactivationDate: Date | null;
    
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({name: 'role_id'})
    role: Role;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];
    
    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];
    
    @OneToMany(() => BuyCourse, (buy_course) => buy_course.user)
    buyCourse: BuyCourse[]; 

}
