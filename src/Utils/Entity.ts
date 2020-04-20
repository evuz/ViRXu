export class Entity<T> {
  constructor(model: T) {
    Object.assign(this, model);
  }
}
