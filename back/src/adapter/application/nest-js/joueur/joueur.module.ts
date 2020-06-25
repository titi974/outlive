import { Module } from '@nestjs/common';
import { JoueurController } from './joueur.controller';
import { JoueurService } from './joueur.service';
import { SharedModule } from '../shared/shared.module'

@Module({
  imports: [
    SharedModule
  ],
  controllers: [JoueurController],
  providers: [JoueurService],
})
export class JoueurModule {}
