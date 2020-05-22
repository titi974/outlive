import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JeuxEntity } from '../entity/Jeux.entity';
import { JeuxRepository } from '../../../adapter/repository/JeuxRepository';
import { Jeux } from '../../../domain/jeux/entity/Jeux';
import { Repository } from 'typeorm';
import {CreerJeux} from "../../../useCase/jeux/CreerJeux";

@Injectable()
export class JeuxService {

  private readonly creerJeux: CreerJeux;

  constructor(@InjectRepository(JeuxEntity) jeuxRepository: Repository<JeuxEntity>) {
    this.creerJeux = new CreerJeux(new JeuxRepository(jeuxRepository));
  }

  async creer(): Promise<Jeux> {
    const jeux: Jeux = new Jeux('1', 'nom');
    return this.creerJeux.executer(jeux);
  }
}
