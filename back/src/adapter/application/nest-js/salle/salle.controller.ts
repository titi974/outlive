import { Body, Controller, Get, Param, Patch, Redirect } from '@nestjs/common'
import { SalleConstruireCommand, SalleService } from './salle.service'
import Salle from '../../../../domain/mise-en-place/entity/Salle'
import { RedirectOtherSee } from '../utils/RedirectOtherSee'
import PathURL from '../utils/PathURL'

type salleByJoueurId = { joueurId: string; salles: Salle[] }

@Controller('salles')
export class SalleController extends RedirectOtherSee {
    constructor(private readonly salleSerivice: SalleService) {
        super()
    }

    @Get()
    async get(): Promise<Salle[]> {
        return this.salleSerivice.getAll()
    }

    @Get('randoms/:session')
    async getRandomSalleByJoueurId(@Param('session') session: string): Promise<salleByJoueurId[]> {
        const randomSallesByJoueurIds = await this.salleSerivice.randomSalleByPlayers(session)
        const results: salleByJoueurId[] = []
        randomSallesByJoueurIds.forEach((val, key) => {
            results.push({ joueurId: key.value, salles: val })
        })
        return results
    }

    @Patch(':session')
    @Redirect(PathURL.JOUEURS, 303)
    async construireSalles(@Param('session') session: string, @Body() salleConstruireCommand: SalleConstruireCommand): Promise<void> {
        await this.salleSerivice.construireSalle(session, salleConstruireCommand)
    }
}
