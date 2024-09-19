import { CourseTopic } from "src/course_topics/entities/course_topic.entity";
import { Entity,Column,PrimaryGeneratedColumn,OneToMany } from "typeorm";


@Entity('topics')
export class Topic {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:100})
    topic: string;

    @OneToMany(() => CourseTopic, (courseTopic) => courseTopic.topic)
    courseTopics: CourseTopic[];

}
