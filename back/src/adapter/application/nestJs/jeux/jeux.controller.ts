import {Controller, Post, Body, Param, Get} from '@nestjs/common'
import {JeuxService} from "./jeux.service";


export type nombreJoueur = { nombre: number }
export type SessionWeb = { numero: string }
export type JoueurWeb = { id: string, couleur: string }
export type JeuxWeb = { session: SessionWeb, dateDebut: string, nombreJoueur: number, joueurs: JoueurWeb[] }

@Controller('jeux')
export class JeuxController {
    constructor(private readonly jeuxService: JeuxService) {
    }

    @Post()
    async creer(@Body() nombreJoueur: nombreJoueur): Promise<SessionWeb> {
        return this.jeuxService.creer(nombreJoueur.nombre)
    }

    @Get(':id')
    async getSession(@Param('id') numero: string): Promise<JeuxWeb> {
        return this.jeuxService.afficherLesJoueurs(numero)
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
