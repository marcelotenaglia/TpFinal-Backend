import { Entity,PrimaryColumn,ManyToOne } from "typeorm";
import { Course } from "src/courses/entities/course.entity";
import { Topic } from "src/topics/entities/topic.entity";


@Entity('course_topics')
export class CourseTopic {

    @PrimaryColumn()
    course_id:number;

    @PrimaryColumn()
    topic_id:number;
    

   /* @ManyToOne(() => Course, (course) => course.courseTopic,{ primary:true})
    course : Course;

    @ManyToOne(() => Topic, (topic) => topic.courseTopic, { primary:true})
    topic: Topic;*/
}
