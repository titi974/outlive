import Ressource from './Ressource'
import { RESSOURCES } from '../../constante/RESSOURCES'

export interface ZoneDeStockage {
    name: ZONE_STOCKAGE_NAME
    ajouter: (ressource: Ressource) => void
    // retirer: (ressource: Ressource) => void
    ressourceAuthorize: (ressource: Ressource) => boolean
    ressources: Ressource[]
}

export enum ZONE_STOCKAGE_NAME {
    EAU = 'EAU',
    NOURRITURE = 'NOURRITURE',
    BOIS = 'BOIS',
    METAL = 'METAL',
    PUCE = 'PUCE',
    MUNITION = 'MUNITION',
}

class UneZoneDeStockage implements ZoneDeStockage {
    constructor(
        public readonly name: ZONE_STOCKAGE_NAME,
        private readonly _ressources: Ressource[],
    ) {}

    ajouter(uneRessource: Ressource): void {
        if (this.ressourceAuthorize(uneRessource)) {
            this._ressources
                .filter(ressource => ressource.nom === uneRessource.nom)
                .forEach(ressource => (ressource.ajouter = uneRessource.quantite))
        }
    }

    ressourceAuthorize(ressource: Ressource): boolean {
        return Boolean(this._ressources.find(r => r.nom === ressource.nom))
    }

    get ressources(): Ressource[] {
        return this._ressources
    }
    //
    // retirer(ressource: Ressource): void {
    // }
}

export const FactoryZoneStockage = (name: ZONE_STOCKAGE_NAME): ZoneDeStockage => {
    const quantite = 0
    switch (name) {
        case ZONE_STOCKAGE_NAME.NOURRITURE:
            return new UneZoneDeStockage(name, [
                new Ressource(RESSOURCES.CONSERVE, quantite),
                new Ressource(RESSOURCES.GIBIER, quantite),
            ])
        case ZONE_STOCKAGE_NAME.BOIS:
            return new UneZoneDeStockage(name, [new Ressource(RESSOURCES.BOIS, quantite)])
        case ZONE_STOCKAGE_NAME.EAU:
            return new UneZoneDeStockage(name, [new Ressource(RESSOURCES.EAU, quantite)])
        case ZONE_STOCKAGE_NAME.METAL:
            return new UneZoneDeStockage(name, [new Ressource(RESSOURCES.METAL, quantite)])
        case ZONE_STOCKAGE_NAME.MUNITION:
            return new UneZoneDeStockage(name, [new Ressource(RESSOURCES.MUNITION, quantite)])
        case ZONE_STOCKAGE_NAME.PUCE:
            return new UneZoneDeStockage(name, [new Ressource(RESSOURCES.PUCE, quantite)])
        default:
            throw new Error('ZONE_STOCKAGE inconnue')
    }
}
