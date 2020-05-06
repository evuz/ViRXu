import { Observable } from 'rxjs';

export type SocketAdapter = {
  on<T = any>(element: string, options?: Object): Observable<T>;
  once<T = any>(element: string, options?: Object): Promise<T>;
  emit<T>(entity: string, value: T, options?: Object): Promise<T & { id: string }>;
  emit<T>(entity: string, element: string, value: T, options?: Object): Promise<T>;
};
