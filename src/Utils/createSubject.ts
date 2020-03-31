import { Subject } from 'rxjs';

export function createSubject<T = any, K extends Subject<T> = Subject<T>>(factory: () => K = () => <any>new Subject()) {
  const subject = factory();
  const observable = subject.asObservable();
  return [subject, observable] as const;
}
