import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Jeux' })
export class JeuxEntity {
	@PrimaryColumn()
	id: string

	@Column()
	dateDebut: Date

	@Column()
	nbreJoueur: number

	// @OneToMany(
	// 	type => JoueurEntity,
	// 	joueur => joueur.jeux,
	// 	{
	// 		eager: true,
	// 	},
	// )
	// @JoinColumn()
	// joueurs: JoueurEntity[]
}
