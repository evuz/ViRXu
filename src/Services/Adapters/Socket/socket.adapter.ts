import { Observable } from 'rxjs';

export type SocketAdapter = {
  on<T = any>(element): Observable<T>;
  once<T = any>(element): Promise<T>;
  emit<T>(entity: string, value: T): Promise<T & { id: string }>;
  emit<T>(entity: string, element: string, value: T): Promise<T>;
};
