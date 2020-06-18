import ValueObject from "../../shared/ValueObject";
import SessionRequiredError from "../error/SessionRequiredError";

export default class Session implements ValueObject<Session> {

    constructor(private readonly session: string) {
        if(!this.session){
            throw new SessionRequiredError()
        }
    }

    get value(): string {
        return this.session
    }

    sameValueAs(value: Session): boolean {
        return false;
    }

}
