import { Module } from '@nestjs/common';
import { JoueurController } from './joueur.controller';
import { JoueurService } from './joueur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM';
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM';
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JeuxRepositoryTypeORM,
      JoueurRepositoryTypeORM,
      LeaderRepositoryTypeORM,
    ]),
  ],
  controllers: [JoueurController],
  providers: [JoueurService],
})
export class JoueurModule {}
