import { ZONE_STOCKAGE_NAME, ZoneDeStockage } from './ZoneDeStockage'
import { Optional } from '@eastbanctech/ts-optional'
import Ressource from './Ressource'
import { AbrisId } from '../valueObject/AbrisId'
import { RESSOURCES } from '../../constante/RESSOURCES'

export default class Abris {
    constructor(public readonly id: AbrisId, private readonly zoneDeStockages: ZoneDeStockage[]) {}

    set ajouterRessource(ressource: Ressource) {
        const zoneDeStockage = Optional.ofNullable(
            this.zoneDeStockages.find(zone => zone.ressourceAuthorize(ressource)),
        ).orElseThrow(() => new Error('Ressource non stockable'))
        zoneDeStockage.ajouter(ressource)
    }

    get mesRessources(): Ressource[] {
        return this.zoneDeStockages.map(zone => zone.ressources).flatMap(ressources => ressources)
    }

    // get zoneDeStockage(zone: ZONE_STOCKAGE_NAME): ZoneDeStockage {
    //     return Optional.ofNullable(this.zoneDeStockages.find(zoneDeStockage => zoneDeStockage.name === zone))
    //         .orElseThrow(() => new Error('Zone inconnue'))
    // }
}
