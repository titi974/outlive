import {IGeneratorId} from "../../domain/joueur/port/IGeneratorId";
import {v4 as uuidv4} from 'uuid';

export class UUIDGenerator implements IGeneratorId{
    execute(): string {
        return uuidv4();
    }

}
