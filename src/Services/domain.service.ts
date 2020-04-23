export function createDomain<T>(useCases: T, config: any) {
  const conf = Object.freeze(config);
  function get<U extends keyof T>(useCase: U) {
    if (!useCases[useCase]) {
      throw Error(`${useCase} doesn't exist in Domain`);
    }
    return useCases[useCase];
  }

  return {
    get,
    config: conf,
  };
}
