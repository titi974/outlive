import { Controller, Get, Param } from '@nestjs/common';
import { LeadersService } from './leaders.service';
import { JoueurWeb } from '../models/JoueurWeb';
import PathURL from '../utils/PathURL';

@Controller(PathURL.LEADERS)
export class LeadersController {
  constructor(private readonly leadersService: LeadersService) {}

  @Get('randoms/:session')
  async getRandom(@Param('session') session: string): Promise<JoueurWeb[]> {
    return this.leadersService.leaderRandomByJoueur({ numero: session });
  }
}
