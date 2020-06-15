import {Controller, Post, Body, Param} from '@nestjs/common'
import {JeuxService} from "./jeux.service";


export type nombreJoueur = { nombre: number }

@Controller('jeux')
export class JeuxController {
    constructor(private readonly jeuxService: JeuxService) {
    }

    @Post()
    async creer(@Body() nombreJoueur: nombreJoueur) {
        return this.jeuxService.creer(nombreJoueur.nombre)
    }

    // @Post(':id/joueurs')
    // async ajouterJoueur(@Body() joueurDTO: JoueurDTO, @Param('id') idJeux: string): Promise<JeuxDTO> {
    //     try {
    //         const jeuxDTO = await this.jeuxService.ajouterJoueur(idJeux, joueurDTO.couleur)
    //         return Promise.resolve(jeuxDTO)
    //     } catch (e) {
    //         return Promise.reject(e)
    //     }
    // }
    //
    // @Get()
    // async getAll(): Promise<any> {
    //     return Promise.resolve(this.jeuxService.getAll())
    // }
}
