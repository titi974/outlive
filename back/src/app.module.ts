import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { Interceptor } from './adapter/application/nest-js/interceptor/Interceptor'
import { JeuxModule } from './adapter/application/nest-js/jeux/jeux.module'
import { LeadersModule } from './adapter/application/nest-js/leaders/leaders.module'
import { JoueurModule } from './adapter/application/nest-js/joueur/joueur.module'
import { SharedModule } from './adapter/application/nest-js/shared/shared.module'
import { AbrisModule } from './adapter/application/nest-js/abris/abris.module'
import { SalleModule } from './adapter/application/nest-js/salle/salle.module'

@Module({
    imports: [JeuxModule, LeadersModule, JoueurModule, SharedModule, AbrisModule, SalleModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: Interceptor,
        },
    ],
})
export class AppModule {}
