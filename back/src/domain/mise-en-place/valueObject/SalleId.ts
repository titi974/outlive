import ValueObject from '../../shared/ValueObject'

export class SalleId implements ValueObject<SalleId> {
    constructor(private readonly id: number) {}

    get value(): number {
        return this.id
    }

    sameValueAs(salleId: SalleId): boolean {
        return this.id === salleId.id
    }
}
