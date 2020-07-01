import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm'
import { JeuxEntity } from './Jeux.entity'
import { LeaderEntity } from './Leader.entity'
import { AbrisEntity } from './Abris.entity'
import EquipementEntity from './Equipement.entity'

@Entity({ name: 'Joueur' })
export class JoueurEntity {
    @PrimaryColumn()
    id: string

    @Column()
    couleur: string

    @Column()
    jeuxId: string

    @Column({ default: '' })
    pseudo: string

    @Column()
    leaderId: number

    @Column()
    abrisId: string

    @ManyToOne(
        type => JeuxEntity,
        jeux => jeux.joueurs,
    )
    jeux: Promise<JeuxEntity>

    @OneToOne(type => LeaderEntity)
    @JoinColumn()
    leader: Promise<LeaderEntity>

    @OneToOne(
        type => AbrisEntity,
        abris => abris.joueur,
        { lazy: true },
    )
    @JoinColumn()
    abris: Promise<AbrisEntity>

    @ManyToMany(type => EquipementEntity)
    @JoinTable()
    equipements: Promise<EquipementEntity[]>
}
