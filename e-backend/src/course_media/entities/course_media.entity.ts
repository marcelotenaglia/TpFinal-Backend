import { Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn, ManyToOne } from "typeorm";
import { Course } from "src/courses/entities/course.entity";


@Entity('course_media')
export class CourseMedia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 255})
    filename: string;

    @Column({type: 'varchar', length: 500})
    mediaPath: string;
    
    @OneToOne(() => Course, (course) => course.media)
    @JoinColumn({name: 'course_id'})
    course: Course;

}
