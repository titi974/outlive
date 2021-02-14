import { Body, Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common'
import { RedirectOtherSee } from '../utils/RedirectOtherSee'
import { AbrisService } from './abris.service'
import { SessionWeb } from '../models/SessionWeb'
import { JoueurWeb } from '../models/JoueurWeb'
import PathURL from '../utils/PathURL'
import AbrisRepositoryTypeORM from '../../../repository/type-orm/AbrisRepositoryTypeORM'
import { AbrisId } from '../../../../domain/mise-en-place/valueObject/AbrisId'

export type AbrisCreate = { session: SessionWeb; joueurs: JoueurWeb[] }

@Controller('abris')
export class AbrisController extends RedirectOtherSee {
    constructor(
        private readonly abrisService: AbrisService,
        private readonly abrisRepositoryTypeORM: AbrisRepositoryTypeORM,
    ) {
        super()
    }

    @Get()
    async getAll(@Query('ids') ids: string) {
        const promise = ids
            ? await this.abrisRepositoryTypeORM.findByIds(ids.split(','))
            : await this.abrisRepositoryTypeORM.find()

        return await Promise.all(
            promise.map(async abrisEntity => {
                const { id, ressources, radioactivite } = abrisEntity
                const joueurEntity = await abrisEntity.joueur
                return { id, ressources, radioactivite, joueur: joueurEntity?.id }
            }),
        )
    }

    @Post()
    @Redirect(PathURL.JOUEURS, 303)
    async creationAbris(@Body() abrisCreate: AbrisCreate) {
        const abrisIds = await this.abrisService.creerLesAbris(abrisCreate)
        const abrisEntities = await this.abrisRepositoryTypeORM.findByIds(
            abrisIds.map(id => id.value),
        )
        const ids = await Promise.all(
            abrisEntities.map(async abrisEntity => {
                const joueurEntity = await abrisEntity.joueur
                return joueurEntity?.id
            }),
        )
        return this.redirect(PathURL.JOUEURS, {
            query: [`ids=${ids.filter(id => typeof id === 'string').join(',')}`],
        })
    }

    @Get(':id')
    async getAbris(@Param('id') numero: string) {
        const abris = await this.abrisService.monAbris(new AbrisId(numero))
    }
}
