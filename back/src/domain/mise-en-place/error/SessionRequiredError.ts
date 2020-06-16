import ErrorDomain from "../../shared/ErrorDomain";

export default class SessionRequiredError extends ErrorDomain {
    constructor(){
        super('Le numero de session est obligatoire')
        this.name = 'SessionRequiredError'
    }
}
