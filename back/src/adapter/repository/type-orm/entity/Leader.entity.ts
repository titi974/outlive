import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { RESSOURCES } from '../../../../domain/constante/RESSOURCES'
import EquipementEntity from './Equipement.entity'

export type ressourcesEntity = { name: RESSOURCES; quantite: number }

@Entity({ name: 'Leader' })
export class LeaderEntity {
    @PrimaryColumn()
    id: number

    @Column()
    identite: string

    @Column()
    profession: string

    @Column()
    age: number

    @Column()
    photo: string

    @Column({ type: 'json' })
    ressources: ressourcesEntity[]

    @Column()
    equipementId: number

    @OneToOne(type => EquipementEntity,
            equipement => equipement.leader)
    @JoinColumn()
    equipement: Promise<EquipementEntity>

}
