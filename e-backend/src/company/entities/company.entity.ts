import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";


@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',length:50})
    companyname : string;

    @Column({type:'varchar',length:20})
    cuit: string;

    @Column({type:'varchar', length:100})
    address : string;

    @Column({type:'varchar',length:20})
    phone: string;




}
