import { generationAlleatoire } from '../domain/mise-en-place/port/GestionAleatoire'
import AucuneListeAGenererError from '../domain/mise-en-place/error/AucuneListeAGenererError'
import { FactoryLeaders } from './factory/LeaderFactory'
import { mapLeaderPersistanceToDomain } from '../adapter/repository/type-orm/mapper/LeaderMapperPersistance'

describe('Génerer une liste aleatoire', () => {
    describe(`de 4 Leaders`, () => {
        it(`à partir d'une liste de 8 avec succès`, async () => {
            const liste = await Promise.all(FactoryLeaders(8).map(mapLeaderPersistanceToDomain))
            const result = generationAlleatoire(4, liste)
            expect(result).toHaveLength(4)
            result.forEach(val => expect(liste).toContainEqual(val))
        })
        it(`à partir d'une liste de 0 en erreur`, () => {
            const liste = []
            const error = new AucuneListeAGenererError()
            expect(() => generationAlleatoire(4, liste)).toThrowError(error)
        })
    })
    describe(`de 6 Leaders`, () => {
        it(`à partir d'une liste de 15 Leader avec doublons avec succès`, async () => {
            const liste = await Promise.all(FactoryLeaders(2).map(mapLeaderPersistanceToDomain))
            const result = generationAlleatoire(3, liste, true)
            expect(result).toHaveLength(3)
            const allReadyFind = {}
            result.forEach(val => {
                const { identite } = val
                if (typeof allReadyFind[identite] === 'number') {
                    allReadyFind[identite] += 1
                } else {
                    allReadyFind[identite] = 1
                }
            })
            const filter = Object.values(allReadyFind).filter(val => val > 1)
            expect(filter).toHaveLength(1)
        })
    })
})
