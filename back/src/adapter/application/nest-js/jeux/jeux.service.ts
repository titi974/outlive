import { Injectable } from '@nestjs/common';
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM';
import { UUIDGenerator } from '../../../id-generator/UUIDGenerator';
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM';
import makePreparezLeJeux, {
  PreparezLeJeux,
} from '../../../../domain/mise-en-place/MakePreparezLeJeux';
import makeAfficherUnJeux, {
  AfficherLeJeux,
} from '../../../../domain/mise-en-place/MakeAfficherLesJoueursDeLaSession';
import { JoueursPseudoCommandWeb } from './jeux.controller';
import * as mapperSession from '../mapper/SessionMapper';
import * as mapperJeux from '../mapper/JeuxMapper';
import * as mapperJoueur from '../mapper/JoueurMapper';
import Session from '../../../../domain/mise-en-place/valueObject/Session';
import {
  EnregistrerLesPseudo,
  makeEnregistrerLesPseudo,
} from '../../../../domain/mise-en-place/MakeEnregistrerLesPseudo';
import { JeuxWeb } from '../models/JeuxWeb';
import { SessionWeb } from '../models/SessionWeb';

@Injectable()
export class JeuxService {
  private readonly creerJeux: PreparezLeJeux;
  private readonly afficherUnJeux: AfficherLeJeux;
  private readonly enregistrerLesPseudos: EnregistrerLesPseudo;

  constructor(
    jeuxRepository: JeuxRepositoryTypeORM,
    joueurRepository: JoueurRepositoryTypeORM,
    uuidGenerator: UUIDGenerator,
  ) {
    this.creerJeux = makePreparezLeJeux(
      jeuxRepository,
      joueurRepository,
      uuidGenerator,
    );
    this.afficherUnJeux = makeAfficherUnJeux(jeuxRepository);
    this.enregistrerLesPseudos = makeEnregistrerLesPseudo(
      jeuxRepository,
      joueurRepository,
    );
  }

  async creer(nombre: number): Promise<SessionWeb> {
    const session: Session = await this.creerJeux(nombre);
    return mapperSession.mapDomainToWeb(session);
  }

  async afficherLeJeux(numero: string): Promise<JeuxWeb> {
    const jeux = await this.afficherUnJeux(new Session(numero));
    return mapperJeux.mapDomainToWeb(jeux);
  }

  async enregistrerLesPseudo(
    joueursPseudoWeb: JoueursPseudoCommandWeb,
  ): Promise<JeuxWeb> {
    const joueurs = joueursPseudoWeb.joueurs.map(
      mapperJoueur.mapJoueurPseudoToDomain,
    );
    const jeux = await this.enregistrerLesPseudos(
      new Session(joueursPseudoWeb.session.numero),
      joueurs,
    );
    return mapperJeux.mapDomainToWeb(jeux);
  }
}
