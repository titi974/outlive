import { ZONE_STOCKAGE_NAME, ZoneDeStockage } from './ZoneDeStockage'
import { Optional } from '@eastbanctech/ts-optional'
import Ressource from './Ressource'
import { AbrisId } from '../valueObject/AbrisId'
import Radioactivite from './Radioactivite'
import Salle from './Salle'

export default class Abris {
    private readonly salles: Salle[] =[];
    constructor(public readonly id: AbrisId, private readonly zoneDeStockages: ZoneDeStockage[], public readonly radioactivite: Radioactivite) {}

    set ajouterRessource(ressource: Ressource) {
        const zoneDeStockage = Optional.ofNullable(
            this.zoneDeStockages.find(zone => zone.ressourceAuthorize(ressource)),
        ).orElseThrow(() => new Error('Ressource non stockable'))
        zoneDeStockage.ajouter(ressource)
    }

    get mesRessources(): Ressource[] {
        return this.zoneDeStockages.map(zone => zone.ressources).flatMap(ressources => ressources)
    }

    get mesSalles(): Salle[]{
        return this.salles;
    }

    // get zoneDeStockage(zone: ZONE_STOCKAGE_NAME): ZoneDeStockage {
    //     return Optional.ofNullable(this.zoneDeStockages.find(zoneDeStockage => zoneDeStockage.name === zone))
    //         .orElseThrow(() => new Error('Zone inconnue'))
    // }
    ajouterLesSalles(salles: Salle[]) {
        this.salles.push(...salles)
    }
}
