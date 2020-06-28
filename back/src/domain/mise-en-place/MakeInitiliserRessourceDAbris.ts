import AbrisRepository from './port/AbrisRepository'
import { AbrisId } from './valueObject/AbrisId'
import { JoueurId } from './valueObject/JoueurId'
import Session from './valueObject/Session'
import Abris from './entity/Abris'
import { FactoryZoneStockage, ZONE_STOCKAGE_NAME} from './entity/ZoneDeStockage'
import { Optional } from '@eastbanctech/ts-optional'
import JoueurRepository from './port/JoueurRepository'
import { UUIDGenerator } from '../../adapter/id-generator/UUIDGenerator'

export type InitAbrisJoueur = (session: Session, joueurIds: JoueurId[]) => Promise<AbrisId[]>

const MakeInitiliserRessourceDAbris = (
    uuidGenerator: UUIDGenerator,
    joueurRepository: JoueurRepository,
    abrisRepository: AbrisRepository,
): InitAbrisJoueur => async (session: Session, joueurIds: JoueurId[]): Promise<AbrisId[]> => {
    const joueurs = await joueurRepository.findJoueurByIds(joueurIds)
    const abrisId: AbrisId[] = []
    joueurs.forEach(joueur => {
        const zoneDeStockages = Object.values(ZONE_STOCKAGE_NAME).map(FactoryZoneStockage)
        const { lesRessources } = joueur.monLeader
        for (const ressource of lesRessources) {
            const zoneDeStockage = Optional.ofNullable(
                zoneDeStockages.find(zone => zone.ressourceAuthorize(ressource)),
            ).orElseThrow(
                () =>
                    new Error(`Aucune zone de stockage trouvé pour la ressource ${ressource.nom}`),
            )
            zoneDeStockage.ajouter(ressource)
        }
        const id = uuidGenerator.execute()
        const idAbris = new AbrisId(id)
        const abris = new Abris(idAbris, zoneDeStockages)
        joueur.ajouterMonAbris(abris)
        abrisId.push(abris.id)
    })

    await abrisRepository.enregistrerDesAbris(joueurs.map(joueur => joueur.monAbris))
    await joueurRepository.mettreAJourDesJoueurs(joueurs)
    return abrisId
}

export default MakeInitiliserRessourceDAbris
