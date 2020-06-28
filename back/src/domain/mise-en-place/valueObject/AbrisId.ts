import ValueObject from '../../shared/ValueObject'

export class AbrisId implements ValueObject<AbrisId> {
    constructor(private readonly id: string) {
        if (!this.id) {
        }
    }

    get value(): string {
        return this.id
    }

    sameValueAs(value: AbrisId): boolean {
        return this.id === value.id
    }
}
