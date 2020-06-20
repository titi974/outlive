import LeaderId from "../valueObject/LeaderId";

export default class Leader {
    constructor(
        public readonly id: LeaderId,
        public readonly identite: string,
        public readonly profession: string,
        public readonly age: number,
        public readonly photo: string
    ) {
    }
}
