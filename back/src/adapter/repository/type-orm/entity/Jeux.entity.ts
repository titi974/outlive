import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Jeux' })
export class JeuxEntity {
	@PrimaryColumn()
	id: string

	// @Column()
	// nom: string

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
