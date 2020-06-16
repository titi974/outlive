import {SessionWeb} from "../jeux/jeux.controller";
import Session from "../../../../domain/mise-en-place/valueObject/Session";

export const mapDomainToWeb = (session: Session): SessionWeb => {
    return {numero: session.value}
}
