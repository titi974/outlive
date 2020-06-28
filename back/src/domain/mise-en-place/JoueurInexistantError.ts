export default class JoueurInexistantError extends Error {
    constructor(id: string) {
        super(`Joueur: ${id} n'exsite pas`)
        this.name = 'JoueurInexistantError'
    }
}
