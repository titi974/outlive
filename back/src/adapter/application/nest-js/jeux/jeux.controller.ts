import {Body, Controller, Get, Param, Post, Put, Redirect} from '@nestjs/common'
import {JeuxService} from "./jeux.service";
import {redirectUri} from "../utils/RedirectOtherSee";

export type LeaderWeb = { identite: string, profession: string, age: number, photo: string }
export type JoueurWeb = { id: string, couleur: string, pseudo?: string, leaderAChoisir?: LeaderWeb[], leader?: LeaderWeb }
export type JeuxWeb = { session: SessionWeb, dateDebut: string, nombreJoueur: number, joueurs: JoueurWeb[] }

export type nombreJoueur = { nombre: number }
export type SessionWeb = { numero: string }
export type JoueurPseudoWeb = { id: string, couleur: string, pseudo: string }
export type JoueursPseudoCommandWeb = { session: SessionWeb, joueurs: JoueurPseudoWeb[] }

const PATH = 'jeux'
const redirect = redirectUri(PATH)

@Controller(PATH)
export class JeuxController {

    constructor(private readonly jeuxService: JeuxService) {
    }

    @Post()
    @Redirect(PATH, 303)
    async creer(@Body() nombreJoueur: nombreJoueur) {
        const sessionWeb = await this.jeuxService.creer(nombreJoueur.nombre);
        return {url: redirect(sessionWeb.numero)}
    }

    @Get(':id')
    async getSession(@Param('id') numero: string): Promise<JeuxWeb> {
        return this.jeuxService.afficherLeJeux(numero)
    }

    @Put(':id/joueurs')
    @Redirect(PATH,303)
    async addPseudo(@Body() joueursPseudoWeb: JoueursPseudoCommandWeb) {
        const jeuxWeb = await this.jeuxService.enregistrerLesPseudo(joueursPseudoWeb);
        return {url: redirect(jeuxWeb.session.numero)}
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
