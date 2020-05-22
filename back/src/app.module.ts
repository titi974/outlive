import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JeuxModule } from './infra/jeux/jeux.module';
import { join } from 'path'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'test',
    database: 'jeux',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  }), JeuxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
