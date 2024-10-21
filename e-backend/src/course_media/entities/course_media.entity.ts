import { Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn, ManyToOne } from "typeorm";
import { Course } from "src/courses/entities/course.entity";



@Entity('course_media')
export class CourseMedia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 255})
    filename: string;

    @Column({ type: 'varchar', length: 255 })
    videoUrl: string; 
    
    @OneToOne(() => Course, (course) => course.media) // Cambiado para referenciar correctamente
    @JoinColumn({ name: 'course_id' }) // Asegúrate de que esta columna exista en la tabla course_media
    course: Course;

}
