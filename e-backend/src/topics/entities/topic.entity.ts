import { Category } from "src/categories/entities/category.entity";
import { CourseTopic } from "src/course_topics/entities/course_topic.entity";
import { Entity,Column,PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from "typeorm";


@Entity('topics')
export class Topic {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:100})
    topic: string;

    @OneToMany(() => CourseTopic, (courseTopic) => courseTopic.topic)
    courseTopics: CourseTopic[];

    @ManyToOne(() => Category, (category) => category.topics)
    @JoinColumn({ name: 'category_id' })
    category: Category;

}
