import { Controller, Post } from '@nestjs/common';
import { JeuxService } from '../service/jeux.service';

@Controller('jeux')
export class JeuxController {
  constructor(private readonly jeuxService: JeuxService) {}

  @Post()
  async creer(){
    return this.jeuxService.creer()
  }

}
