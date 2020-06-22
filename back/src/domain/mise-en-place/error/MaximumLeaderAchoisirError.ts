import ErrorDomain from '../../shared/ErrorDomain';

export default class MaximumLeaderAchoisirError extends ErrorDomain {
  constructor() {
    super('Vous ne pouvez pas avoir plus de 2 Leader à choisir');
    this.name = 'MaximumLeaderAchoisirError';
  }
}
