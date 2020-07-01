import ValueObject from '../../shared/ValueObject'

export class EquipementId implements ValueObject<EquipementId> {

    constructor(private readonly id: number) {
        if (!this.id) {
        }
    }

    get value(): number {
        return this.id
    }

    sameValueAs(value: EquipementId): boolean {
        return false;
    }

}
