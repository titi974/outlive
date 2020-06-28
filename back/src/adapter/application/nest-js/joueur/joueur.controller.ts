import { Body, Controller, Get, Param, Patch, Query, Redirect } from '@nestjs/common'
import { JoueurAddLeaderCommand, JoueurService } from './joueur.service'
import { RedirectOtherSee } from '../utils/RedirectOtherSee'
import { JoueurWeb } from '../models/JoueurWeb'
import PathURL from '../utils/PathURL'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'

@Controller(PathURL.JOUEURS)
export class JoueurController extends RedirectOtherSee {
    constructor(private readonly service: JoueurService,
                private readonly joueurRepositoryTypeORM: JoueurRepositoryTypeORM) {
        super()
    }

    @Get()
    async getAll(@Query('ids') ids: string) {
        return this.joueurRepositoryTypeORM.findJoueurByIds(ids.split(',').map(id => new JoueurId(id)))
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<JoueurWeb> {
        return this.service.afficherLeJoueurId(id)
    }

    @Patch(':id/leader')
    @Redirect(PathURL.JOUEURS, 303)
    async ajouterUnLeader(
        @Param('id') id: string,
        @Body() joueurAddLeaderCommand: JoueurAddLeaderCommand,
    ) {
        const joueurWeb = await this.service.ajouterUnLeader(joueurAddLeaderCommand)
        return this.redirect(PathURL.JOUEURS, { uri: [joueurWeb.id] })
    }
}
