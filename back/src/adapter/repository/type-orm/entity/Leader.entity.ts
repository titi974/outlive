import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name:'Leader'})
export class LeaderEntity {
    @PrimaryColumn()
    id: string

    @Column()
    identite: string

    @Column()
    profession: string

    @Column()
    age: number

    @Column()
    photo: string
}
