import { RESSOURCES } from '../../constante/RESSOURCES'

export default class Ressource {
    constructor(public readonly nom: RESSOURCES, private nombre: number) {}

    get quantite(): number {
        return this.nombre
    }

    set ajouter(nombre: number) {
        this.nombre = nombre
    }
}
