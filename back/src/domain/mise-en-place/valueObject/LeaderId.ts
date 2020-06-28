import ValueObject from '../../shared/ValueObject'

export default class LeaderId implements ValueObject<LeaderId> {
    constructor(private readonly id: number) {}

    get value(): number {
        return this.id
    }

    sameValueAs(value: LeaderId): boolean {
        return this.id === value.id
    }
}
