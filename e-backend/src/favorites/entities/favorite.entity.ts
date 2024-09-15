import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity('favorites')
export class Favorite {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  course_id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Course, (course) => course.favorites)
  course: Course;
}
