import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { JeuxEntity } from './Jeux.entity'
import { AbrisEntity } from './Abris.entity'

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

    @OneToOne(
        type => AbrisEntity,
        abris => abris.joueur,
        { lazy: true },
    )
    @JoinColumn()
    abris: Promise<AbrisEntity>
}
