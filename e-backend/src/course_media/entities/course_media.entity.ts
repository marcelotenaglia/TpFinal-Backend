import { Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn } from "typeorm";
import { Course } from "src/courses/entities/course.entity";


@Entity('course_media')
export class CourseMedia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'blob'})
    image: Buffer;
    
    @OneToOne(() => Course)
    @JoinColumn() // Se usa JoinColumn para indicar la columna de la clave foránea en una relación OneToOne
    course: Course;

}
