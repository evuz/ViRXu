import { domainFactory } from './domain.factory';

export type Domain = ReturnType<typeof domainFactory>;

export const domain = domainFactory();
