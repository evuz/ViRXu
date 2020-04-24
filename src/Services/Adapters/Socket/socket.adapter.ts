import { Observable } from 'rxjs';

export type SocketAdapter = {
  on<T = any>(element: string): Observable<T>;
  once<T = any>(element: string): Promise<T>;
  emit<T>(entity: string, value: T): Promise<T & { id: string }>;
  emit<T>(entity: string, element: string, value: T): Promise<T>;
};
