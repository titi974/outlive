import ErrorDomain from '../../shared/ErrorDomain'

export default class AucuneListeAGenererError extends ErrorDomain {
    constructor() {
        super(`Il n'y a pas de liste`)
        this.name = 'AucuneListeAGenererError'
    }
}
