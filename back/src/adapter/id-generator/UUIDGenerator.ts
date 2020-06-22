import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IGeneratorId } from '../../domain/shared/IGeneratorId';

@Injectable()
export class UUIDGenerator implements IGeneratorId {
  execute(): string {
    return uuidv4();
  }
}
