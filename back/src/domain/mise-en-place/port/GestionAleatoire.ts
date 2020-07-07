import AucuneListeAGenererError from '../error/AucuneListeAGenererError'
import { Entity } from '../../shared/Entity'

export const generationAlleatoire = <T extends Entity<T>>(nombreAGenerer: number, liste: T[], withDoublons = false): T[] => {
    if (liste.length === 0) {
        throw new AucuneListeAGenererError()
    }
    const elementGenerate: T[] = []
    const size = liste.length
    do {
        const val = Math.floor(Math.random() * Math.floor(size))
        const element = liste[val]
        if (val >= 0 && val <= size) {
            if ((withDoublons && elementGenerate.filter(ele => ele.sameEntityAs(element)).length < 3) || !elementGenerate.includes(element)) {
                elementGenerate.push(element)
            }
        }
    } while (elementGenerate.length < nombreAGenerer)

    return elementGenerate
}
