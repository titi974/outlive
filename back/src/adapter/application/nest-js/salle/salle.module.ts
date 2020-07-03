import { Module } from '@nestjs/common';
import { SalleService } from './salle.service';
import { SalleController } from './salle.controller';
import { SharedModule } from '../shared/shared.module'

@Module({
  imports:[SharedModule],
  providers: [SalleService],
  controllers: [SalleController]
})
export class SalleModule {}
