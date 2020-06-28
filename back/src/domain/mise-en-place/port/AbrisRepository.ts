import Abris from '../entity/Abris'

export default interface AbrisRepository {
    enregistrerDesAbris: (abris: Abris[]) => Promise<void>
}
