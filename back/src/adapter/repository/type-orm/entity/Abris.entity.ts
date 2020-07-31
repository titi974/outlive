import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { ressourcesEntity } from './Leader.entity'
import { JoueurEntity } from './Joueur.entity'
import SalleEntity from './Salle.entity'

@Entity({ name: 'Abris' })
export class AbrisEntity {
    @PrimaryColumn()
    id: string

    @Column()
    radioactivite: number

    @Column({ type: 'json' })
    ressources: ressourcesEntity[]

    @OneToOne(
        type => JoueurEntity,
        joueur => joueur.abris,
    )
    joueur: Promise<JoueurEntity>

    @ManyToMany(type => SalleEntity)
    @JoinTable({ name: 'Abris_Salles' })
    salles: Promise<SalleEntity[]>
}
