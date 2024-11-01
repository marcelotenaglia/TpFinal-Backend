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


    
   /* @Column({type: 'varchar', length: 255}) agregar estas columnas 
    filename: string; // este dato es para el front

      @Column({type: 'varchar', length: 255}) agregar estas columnas
    fileurl: string;  // este dato para traer el file
    
    @Column({ type: 'varchar', length: 255 })
    videoname: string;
    
    @Column({ type: 'varchar', length: 255 })
    videoUrl: string; */

    @ManyToOne(() => Course, (courseEntity) => courseEntity.classes)
    @JoinColumn({name: 'course_id'})
    course: Course;


 

}
