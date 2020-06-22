import { Body, Controller, Get, Param } from '@nestjs/common';
import { LeadersService } from './leaders.service';
import { JoueurWeb, SessionWeb } from '../jeux/jeux.controller';

@Controller('leaders')
export class LeadersController {
  constructor(private readonly leadersService: LeadersService) {}

  @Get('randoms/:session')
  async getRandom(@Param('session') session: string): Promise<JoueurWeb[]> {
    return this.leadersService.leaderRandomByJoueur({ numero: session });
  }
}
