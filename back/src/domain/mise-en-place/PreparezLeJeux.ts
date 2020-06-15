import JeuxRepository from "./port/JeuxRepository";
import {UUIDGenerator} from "../../adapter/id-generator/UUIDGenerator";
import Jeux from "./entity/Jeux";
import Session from "./valueObject/Session";

type PreparezLeJeux = (nombre: number) => Promise<string>

const PreparezLeJeux = (jeuxRepository: JeuxRepository, uuidGenerator: UUIDGenerator): PreparezLeJeux =>
    async (nombre: number): Promise<string> => {
        const session = new Session(uuidGenerator.execute());
        const jeux = new Jeux(session);
        await jeuxRepository.creer(jeux)
        return session.value
    }

export default PreparezLeJeux
