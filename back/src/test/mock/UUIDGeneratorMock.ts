import { IGeneratorId } from '../../domain/shared/IGeneratorId'
import { Provider } from '@nestjs/common'
import { UUIDGenerator } from '../../adapter/id-generator/UUIDGenerator'

export class UUIDGeneratorMock implements IGeneratorId {
    execute(): string {
        return '1'
    }
}

export const providerUUIDGenerator = {
    provide: UUIDGenerator,
    useClass: UUIDGeneratorMock,
} as Provider
