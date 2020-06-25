import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { JeuxEntity } from './Jeux.entity';
import { LeaderEntity } from './Leader.entity';

@Entity({ name: 'Joueur' })
export class JoueurEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  couleur: string;

  @Column()
  jeuxId: string;

  @Column({ default: '' })
  pseudo: string;

  @Column()
  leaderId: number;

  @ManyToOne((type) => JeuxEntity, (jeux) => jeux.joueurs)
  jeux: Promise<JeuxEntity>;

  @OneToOne((type) => LeaderEntity)
  @JoinColumn()
  leader: Promise<LeaderEntity>;
}
