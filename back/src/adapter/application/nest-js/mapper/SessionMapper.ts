import Session from '../../../../domain/mise-en-place/valueObject/Session';
import { SessionWeb } from '../models/SessionWeb';

export const mapDomainToWeb = (session: Session): SessionWeb => {
  return { numero: session.value };
};
