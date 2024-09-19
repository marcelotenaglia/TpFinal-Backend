import { Entity,PrimaryColumn,ManyToOne,JoinColumn } from "typeorm";
import { Course } from "src/courses/entities/course.entity";
import { Topic } from "src/topics/entities/topic.entity";


@Entity('course_topics')
export class CourseTopic {

    @PrimaryColumn()
    course_id:number;

    @PrimaryColumn()
    topic_id:number;
    

    @ManyToOne(() => Course, (course) => course.courseTopics)
    @JoinColumn({ name: 'course_id' })
    course : Course;

    @ManyToOne(() => Topic, (topic) => topic.courseTopics)
    @JoinColumn({ name: 'topic_id' })
    topic: Topic;
}
