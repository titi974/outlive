import JeuxRepository from '../domain/mise-en-place/port/JeuxRepository'
import Session from '../domain/mise-en-place/valueObject/Session'
import Jeux from '../domain/mise-en-place/entity/Jeux'
import { Optional } from '@eastbanctech/ts-optional'
import Joueur from '../domain/mise-en-place/entity/Joueur'
import LeaderRepository from '../domain/mise-en-place/port/LeaderRepository'
import Leader from '../domain/mise-en-place/entity/Leader'
import MakeGenererLeadersAleatoire from '../domain/mise-en-place/MakeGenererLeadersAleatoire'
import { JoueurId } from '../domain/mise-en-place/valueObject/JoueurId'
import { COULEURS } from '../domain/constante/COULEURS'

class JeuxRepositoryMock implements JeuxRepository {
    afficherLeJeux(id: Session): Promise<Optional<Jeux>> {
        return Promise.resolve(undefined)
    }

    creer(jeux: Jeux): Promise<void> {
        return Promise.resolve(undefined)
    }

}

class LeaderRepositoryMock implements LeaderRepository {
    allLeaders(): Promise<Leader[]> {
        return Promise.resolve([])
    }

    leaderByNom(leaderNom: string): Promise<Leader> {
        return Promise.resolve(undefined)
    }

}

describe('MakeGenererLeadersAleatoire', () => {
    const session = new Session('1')
    const jeuxRepositoryMock = new JeuxRepositoryMock()
    const leaderRepositoryMock = new LeaderRepositoryMock()
    it('Generer des Leaders', async () => {
        const jeux = new Jeux(session, new Date(), 2)
        const joueur1 = new Joueur(new JoueurId('1'), COULEURS.BLEU)
        const joueur2 = new Joueur(new JoueurId('2'), COULEURS.ROUGE)
        joueur1.ajouterUnPseudo('1')
        joueur2.ajouterUnPseudo('2')
        jeux.ajouterDesJoueurs([joueur1, joueur2])
        const makeGenererLeadersAleatoire = MakeGenererLeadersAleatoire(jeuxRepositoryMock, leaderRepositoryMock)
        jest.spyOn(jeuxRepositoryMock, 'afficherLeJeux').mockResolvedValue(Optional.of(jeux))
        jest.spyOn(leaderRepositoryMock, 'allLeaders').mockResolvedValue([{} as Leader, {} as Leader, {} as Leader, {} as Leader, {} as Leader, {} as Leader])
        const joueurs = await makeGenererLeadersAleatoire(session)
        expect(joueurs).toHaveLength(2)

    })
})
