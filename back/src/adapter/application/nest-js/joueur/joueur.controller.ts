import {Body, Controller, Get, Param, Patch, Redirect} from '@nestjs/common';
import {JoueurAddLeaderCommand, JoueurService} from "./joueur.service";
import {redirectUri} from "../utils/RedirectOtherSee";
import {JoueurWeb} from "../jeux/jeux.controller";

const PATH = 'joueurs'
const redirect = redirectUri(PATH)

@Controller('joueurs')
export class JoueurController {
    constructor(private readonly service: JoueurService) {
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<JoueurWeb>{
        return  this.service.afficherLeJoueurId(id);
    }

    @Patch(':id/leader')
    @Redirect(PATH, 303)
    async ajouterUnLeader(@Param('id') id:string,@Body() joueurAddLeaderCommand: JoueurAddLeaderCommand) {
        const joueurWeb = await this.service.ajouterUnLeader(joueurAddLeaderCommand);
        return {url: redirect(joueurWeb.id)}
    }
}
