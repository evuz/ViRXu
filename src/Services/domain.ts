import { domainFactory } from './domain.factory';
import { createSingleton } from '../Utils/singleton';

export type Domain = ReturnType<typeof domainFactory>;

export const domain = createSingleton(domainFactory);
