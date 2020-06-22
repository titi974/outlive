export interface Entity<T> {
  sameEntityAs: (entity: T) => boolean;
}
