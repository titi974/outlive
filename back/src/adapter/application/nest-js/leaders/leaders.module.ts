import { Module } from '@nestjs/common';
import { LeadersService } from './leaders.service';
import { LeadersController } from './leaders.controller';
import { SharedModule } from '../shared/shared.module'

@Module({
  imports: [
    SharedModule
  ],
  providers: [LeadersService],
  controllers: [LeadersController],
})
export class LeadersModule {}
