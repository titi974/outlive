import {Body, Controller, Patch} from '@nestjs/common';
import {JoueurAddLeaderCommand, JoueurService} from "./joueur.service";
import {JoueurWeb} from "../jeux/jeux.controller";

@Controller('joueurs')
export class JoueurController {
    constructor(private readonly service: JoueurService) {
    }

    @Patch(':id/leader')
    async ajouterUnLeader(@Body() joueurIdWithLeaderWeb: JoueurAddLeaderCommand): Promise<JoueurWeb> {
        return this.service.enregistrer(joueurIdWithLeaderWeb)
    }

}
