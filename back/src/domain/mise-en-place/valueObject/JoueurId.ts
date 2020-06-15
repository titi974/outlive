import ValueObject from "../../shared/ValueObject";

export class JoueurId implements ValueObject<JoueurId> {
    constructor(private readonly id: string) {
    }

    get value(): string {
        return this.id
    }

    sameValueAs(value: JoueurId): boolean {
        return false;
    }
}
