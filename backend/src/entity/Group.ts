import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Group {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

}
