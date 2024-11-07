import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('buy_courses')
export class BuyCourse {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  course_id: number;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchase_date: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.favorites)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
