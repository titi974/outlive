import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RESSOURCES } from '../../../../domain/constante/RESSOURCES'
import { LeaderEntity } from './Leader.entity'

type coutEntity = { name: RESSOURCES; quantite: number }

@Entity({ name: 'Equipement' })
export default class EquipementEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column({ type: 'json' })
    cout: coutEntity[]

    @Column()
    logo: string

    @Column()
    bonus: string

    @Column()
    info: string

    @Column()
    reparer: boolean

    @Column()
    img: string

    @OneToOne(
        type => LeaderEntity,
        leader => leader.equipement,
        { lazy: true },
    )
    leader: Promise<LeaderEntity>
}
