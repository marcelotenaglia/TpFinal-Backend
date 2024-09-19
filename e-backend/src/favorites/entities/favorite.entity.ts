import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity('favorites')
export class Favorite {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  course_id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToOne(() => Course, (course) => course.favorites)
  @JoinColumn({name: 'course_id'})
  course: Course;
}
