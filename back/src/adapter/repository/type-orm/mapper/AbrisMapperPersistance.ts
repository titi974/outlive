import { AbrisEntity } from '../entity/Abris.entity'
import Abris from '../../../../domain/mise-en-place/entity/Abris'
import { AbrisId } from '../../../../domain/mise-en-place/valueObject/AbrisId'
import Radioactivite from '../../../../domain/mise-en-place/entity/Radioactivite'
import {
    FactoryZoneStockage,
    ZONE_STOCKAGE_NAME,
    ZoneDeStockage,
} from '../../../../domain/mise-en-place/entity/ZoneDeStockage'
import { mapRessourcePersistanceToDomain } from './RessourceMapperPersistance'
import { Optional } from '@eastbanctech/ts-optional'
import { mapPersistanceToDomain } from './SalleMapperPersistance'

export const mapAbrisPersistanceToDomain = async (abrisEntity: AbrisEntity): Promise<Abris> => {
    const { id, ressources, radioactivite } = abrisEntity
    const zones: ZoneDeStockage[] = []
    Object.values(ZONE_STOCKAGE_NAME).forEach(zone => zones.push(FactoryZoneStockage(zone)))
    const abris = new Abris(new AbrisId(id), zones, new Radioactivite(radioactivite))
    ressources.forEach(ressource => abris.ajouterRessource = mapRessourcePersistanceToDomain(ressource))
    Optional.ofNullable(await abrisEntity.salles).ifPresent(salleEntities => {
        abris.ajouterLesSalles(salleEntities.map(mapPersistanceToDomain))
    })
    return abris
}
