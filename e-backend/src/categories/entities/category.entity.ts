import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "src/courses/entities/course.entity";
import { Topic } from "src/topics/entities/topic.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:100})
    name: string;

    @Column({type:'varchar',length:255})
    requisitos : string;
    
    @Column({type:'varchar',length:255})
    certificacion : string;


    @OneToMany(() => Course, (course) => course.category)
    courses: Course[];

    @OneToMany(() => Topic, (topic) => topic.category)
    topics: Topic[];
}
