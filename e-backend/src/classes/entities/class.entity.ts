import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';


@Entity('classes')
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100 })
    title: string;

    @Column({type:'text'})
    content : string;

    @Column('int')
    duration : number;


    @ManyToOne(() => Course, (couseEntity) => couseEntity.classes)
    course: Course;


}
