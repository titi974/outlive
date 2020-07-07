import { Controller, Get, Param } from '@nestjs/common'
import { SalleService } from './salle.service'

@Controller('salles')
export class SalleController {
    constructor(private readonly salleSerivice: SalleService) {
    }

    @Get()
    async get(){
        return this.salleSerivice.getAll()
    }

    @Get(':idSession')
    async getRandomSalleByJoueurId(@Param('idSession') idSession: string){
        return this.salleSerivice.randomSalleByPlayers(idSession)
    }

}
