export function createUseCase<T extends Function>(fn: T) {
  return { execute: fn };
}
