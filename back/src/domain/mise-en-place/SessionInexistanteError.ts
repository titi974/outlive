import Session from './valueObject/Session'

export default class SessionInexistanteError extends Error {
    constructor(session: Session) {
        super(`Session: ${session.value} n'exsite pas`)
        this.name = 'SessionInexistanteError'
    }
}
