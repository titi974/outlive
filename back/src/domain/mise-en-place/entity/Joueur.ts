import { Entity } from '../../shared/Entity'
import { COULEURS } from '../../constante/COULEURS'
import { JoueurId } from '../valueObject/JoueurId'
import Leader from './Leader'
import MaximumLeaderAchoisirError from '../error/MaximumLeaderAchoisirError'
import Abris from './Abris'
import Equipement from './Equipement'
import { Optional } from '@eastbanctech/ts-optional'

export default class Joueur implements Entity<Joueur> {
    private monPseudo: string
    public readonly leadersAChoisr: Leader[] = []
    private leader: Leader
    private abris: Abris
    public equipements: Equipement[] = []

    constructor(public readonly id: JoueurId, public readonly couleur: COULEURS) {}

    get pseudo(): string {
        return this.monPseudo
    }

    get monLeader(): Leader {
        return this.leader
    }

    get monAbris(): Abris {
        return this.abris
    }

    ajouterUnPseudo(pseudo: string) {
        this.monPseudo = pseudo
    }

    sameEntityAs(entity: Joueur): boolean {
        return this.id.sameValueAs(entity.id)
    }

    leaderAChoisir(leader: Leader) {
        if (this.leadersAChoisr.length === 2) {
            throw new MaximumLeaderAchoisirError()
        }
        if (this.leadersAChoisr.includes(leader)) {
            throw new Error('Leader exist déjà')
        }
        this.leadersAChoisr.push(leader)
    }

    ajouterLeader(leader: Leader) {
        this.leader = leader
    }

    ajouterMonAbris(abris: Abris) {
        if (this.abris) {
            throw new Error('Abris déjà affecté')
        }
        this.abris = abris
    }

    ajouterEquipement(equipement: Equipement) {
        if (this.equipements.includes(equipement)) {
            throw new Error(`Vous avez déjà cette équipement: ${equipement.nom}`)
        }
        this.equipements.push(equipement)
    }
}
