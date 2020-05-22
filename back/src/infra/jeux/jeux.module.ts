import { Module } from '@nestjs/common';
import { JeuxService } from './service/jeux.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JeuxEntity } from './entity/Jeux.entity';
import { JeuxController } from './controller/jeux.controller';

@Module({
  imports:[TypeOrmModule.forFeature([JeuxEntity])],
  providers: [JeuxService],
  controllers: [JeuxController]
})
export class JeuxModule {}
