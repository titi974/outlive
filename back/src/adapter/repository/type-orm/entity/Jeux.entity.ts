import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn} from 'typeorm'
import {JoueurEntity} from "./Joueur.entity";

@Entity({ name: 'Jeux' })
export class JeuxEntity {
	@PrimaryColumn()
	id: string

	@Column()
	dateDebut: Date

	@Column()
	nbreJoueur: number

	@OneToMany(
		type => JoueurEntity,
		joueur => joueur.jeux,
		{
			eager: true,
		},
	)
	@JoinColumn()
	joueurs: JoueurEntity[]
}
