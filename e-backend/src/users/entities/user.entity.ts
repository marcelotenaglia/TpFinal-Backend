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

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ type: 'date' })
    birthdate: Date;
    
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({name: 'role_id'})
    role: Role;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];
    
    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

}
