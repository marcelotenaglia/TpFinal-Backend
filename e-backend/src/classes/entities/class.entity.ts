import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';


@Entity('classes')
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100 })
    title: string;

    @Column({type:'text'})
    fileurl : string;

    @Column({type:'text'})
    videourl : string;

    @ManyToOne(() => Course, (courseEntity) => courseEntity.classes)
    @JoinColumn({name: 'course_id'})
    course: Course;


 

}
