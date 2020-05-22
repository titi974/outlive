import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'Jeux'})
export class JeuxEntity {

  @PrimaryColumn()
  id: string

  @Column()
  nom: string

}
