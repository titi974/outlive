import ValueObject from "../../shared/ValueObject";

export default class Session implements ValueObject<Session> {

    constructor(private readonly session: string) {
    }

    get value(): string {
        return this.session
    }

    sameValueAs(value: Session): boolean {
        return false;
    }

}
