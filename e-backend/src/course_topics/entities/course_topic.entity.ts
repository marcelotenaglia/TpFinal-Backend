import { Entity,PrimaryColumn,ManyToOne } from "typeorm";
import { Course } from "src/courses/entities/course.entity";
import { Topic } from "src/topics/entities/topic.entity";


@Entity('course_topics')
export class CourseTopic {

    @PrimaryColumn()
    course_id:number;

    @PrimaryColumn()
    topic_id:number;
    

    @ManyToOne(() => Course, (course) => course.courseTopics)
    course : Course;

    @ManyToOne(() => Topic, (topic) => topic.courseTopics)
    topic: Topic;
}
