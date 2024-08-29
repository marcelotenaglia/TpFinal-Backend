import { Entity, PrimaryColumn } from "typeorm";



@Entity('buy_courses')
export class BuyCourse {

    @PrimaryColumn()
    user_id:number;

    @PrimaryColumn()
    course_id: number;



}
