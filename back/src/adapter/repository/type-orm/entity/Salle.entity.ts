import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Salle' })
export default class SalleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    activation: string

    @Column()
    info: string

    @Column()
    img: string

    @Column()
    action: string

    @Column()
    type: string

    @Column()
    combien: string

    @Column()
    entretien: string

    @Column()
    place: number
}
