import { Entity,Column,PrimaryGeneratedColumn,OneToMany,OneToOne } from "typeorm";
import { Class } from "src/classes/entities/class.entity";
import { CourseMedia } from "src/course_media/entities/course_media.entity";

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar',length:100})
    title:string;

    @Column({type:'text'})
    description: string;

    @Column({type:'int'})
    duration:number;

    @Column({type:'varchar',length:100})
    platform: string;

    @Column({type: 'float'})
    rating: number;

    @Column({type:'varchar',length:50})
    category:string;

    @Column({type:'decimal', precision:4,scale:2})
    price:number;



    //RELACIONES

    @OneToMany(() => Class, (classEntity) => classEntity.course,{ eager: true })
    classes: Class[];

    @OneToOne(() => CourseMedia, (courseMedia) => courseMedia.course,{ eager: true })
    media: CourseMedia;

    //falta agregar el usuario y la relacion

}
