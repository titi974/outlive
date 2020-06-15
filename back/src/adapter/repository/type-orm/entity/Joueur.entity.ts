import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {JeuxEntity} from "./Jeux.entity";

@Entity({name: 'Joueur'})
export class JoueurEntity {
    @PrimaryColumn()
    id: string

    @Column()
    couleur: string

    @Column()
    jeuxId: string

    @ManyToOne(
        type => JeuxEntity,
        jeux => jeux.joueurs,
    )
    jeux: JeuxEntity
}
