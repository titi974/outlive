import { Column, Entity, PrimaryColumn } from 'typeorm'
import { RESSOURCES } from '../../../../domain/constante/RESSOURCES'

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
}
