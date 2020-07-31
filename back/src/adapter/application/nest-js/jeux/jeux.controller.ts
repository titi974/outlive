import { Body, Controller, Get, Param, Post, Put, Redirect } from '@nestjs/common'
import { JeuxService } from './jeux.service'
import { RedirectOtherSee } from '../utils/RedirectOtherSee'
import { JeuxWeb } from '../models/JeuxWeb'
import { SessionWeb } from '../models/SessionWeb'
import PathURL from '../utils/PathURL'

export type nombreJoueur = { nombre: number }
export type JoueurPseudoWeb = { id: string; couleur: string; pseudo: string }
export type JoueursPseudoCommandWeb = {
    session: SessionWeb
    joueurs: JoueurPseudoWeb[]
}

export type SalleEnregeistrementCommand = { joueurId: string; salles: number[] }

@Controller(PathURL.JEUX)
export class JeuxController extends RedirectOtherSee {
    constructor(private readonly jeuxService: JeuxService) {
        super()
    }

    @Post()
    @Redirect(PathURL.JEUX, 303)
    async creer(@Body() nombreJoueur: nombreJoueur) {
        const sessionWeb = await this.jeuxService.creer(nombreJoueur.nombre)
        return this.redirect(PathURL.JEUX, { uri: [sessionWeb.numero] })
    }

    @Get(':id')
    async getSession(@Param('id') numero: string): Promise<JeuxWeb> {
        return this.jeuxService.afficherLeJeux(numero)
    }

    @Put(':id/joueurs')
    @Redirect(PathURL.JEUX, 303)
    async addPseudo(@Body() joueursPseudoWeb: JoueursPseudoCommandWeb) {
        const jeuxWeb = await this.jeuxService.enregistrerLesPseudo(joueursPseudoWeb)
        return this.redirect(PathURL.JEUX, { uri: [jeuxWeb.session.numero] })
    }

    @Post(':id/salles')
    async addSalles(
        @Body() salleEnregeistrementCommand: SalleEnregeistrementCommand,
        @Param('id') numero: string,
    ) {
        await this.jeuxService.saveRooms(numero, salleEnregeistrementCommand)
    }

    // @Post(':id/joueurs')
    // async ajouterJoueur(@Body() joueurDTO: JoueurWeb, @Param('id') idJeux: string): Promise<JeuxWeb> {
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
