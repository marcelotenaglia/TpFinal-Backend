import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "src/courses/entities/course.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:100})
    name: string;


    @OneToMany(() => Course, (course) => course.category)
    courses: Course[];
}
