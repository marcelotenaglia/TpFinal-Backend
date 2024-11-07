import { Entity,Column,PrimaryGeneratedColumn,OneToMany,OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Class } from "src/classes/entities/class.entity";
import { CourseMedia } from "src/course_media/entities/course_media.entity";
import { User } from "src/users/entities/user.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { CourseTopic } from "src/course_topics/entities/course_topic.entity";
import { Category } from "src/categories/entities/category.entity";
import { BuyCourse } from "src/buy_courses/entities/buy_course.entity";
import { Rating } from "src/rating/entities/rating.entity";

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

    @Column({type:'decimal', precision:4,scale:2})
    price:number;

    @Column({type: 'boolean', default: true})
    disable: boolean;

    @Column({ type: 'float', default: 3 }) 
     rating: number;
    
    /*@Column({ type: 'date' })
    startdate: Date;
    
    @Column({ type: 'date' })
    enddate: Date;*/ //faltaria esto 
  



    //RELACIONES

    @OneToMany(() => Class, (classEntity) => classEntity.course,{ eager: true })
    classes: Class[];

    @OneToOne(() => CourseMedia, (courseMedia) => courseMedia.course)
    media: CourseMedia;


    @ManyToOne(() => User, (user) => user.courses, { nullable: false })
    @JoinColumn({name: 'instructor_id'})
    instructor: User;
 

    @OneToMany(() => Favorite, (favorite) => favorite.course)
    favorites: Favorite[];

    @OneToMany(() => CourseTopic, (courseTopic) => courseTopic.course)
    courseTopics: CourseTopic[];

    @ManyToOne(() => Category, (category) => category.courses)
    @JoinColumn({ name: 'category_id' })
    category: Category;


    @OneToMany(() => BuyCourse, (buy_course) => buy_course.course)
    buyCourse: BuyCourse[];

    @OneToMany(() => Rating, (rating) => rating.course)
    ratings: Rating[];
}
