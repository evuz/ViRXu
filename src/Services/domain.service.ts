type ICreateDomain<T, K> = {
  useCases: T;
  config: any;
  adapters: K;
};

export function createDomain<T, K>({ useCases, config, adapters }: ICreateDomain<T, K>) {
  const conf = Object.freeze(config);
  function get<U extends keyof T>(useCase: U) {
    if (!useCases[useCase]) {
      throw Error(`${useCase} doesn't exist in Domain`);
    }
    return useCases[useCase];
  }

  function adapter<U extends keyof K>(key: U) {
    if (!adapters[key]) {
      throw Error(`${key} doesn't exist in Domain`);
    }
    return adapters[key];
  }

  return {
    get,
    adapter,
    config: conf,
  };
}
