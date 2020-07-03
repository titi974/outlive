import { Controller, Get } from '@nestjs/common'
import { SalleService } from './salle.service'

@Controller('salles')
export class SalleController {
    constructor(private readonly salleSerivice: SalleService) {
    }

    @Get()
    async get(){
        return this.salleSerivice.getAll()
    }

}
