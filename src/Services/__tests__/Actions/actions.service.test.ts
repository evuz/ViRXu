import { Subject, interval, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ActionService, actionsService } from '../../Actions/actions.service';
import { take, map } from 'rxjs/operators';

let on$: Observable<any>;
function socketMock() {
  return {
    on: jest.fn(() => {
      return on$;
    }),
    once: null,
    emit: jest.fn((v) => Promise.resolve(v)),
  };
}

const valuesGenerator = (n = 3) => Array.from({ length: n }).map((_, i) => ({ value: i }));

describe('Actions Service', () => {
  let service: ActionService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    on$ = new Subject<any>();
    service = actionsService(socketMock());
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should create', () => {
    expect(service).toBeTruthy();
  });

  test('should only recive values when it is in a room', () => {
    const expectedOnValues = { a: 0, b: 1, c: 2, d: 3, e: 4 };
    on$ = interval(1000).pipe(take(5));

    testScheduler.run(({ expectObservable }) => {
      const expectedOnMarble = '1s a 999ms b 999ms c 999ms d 999ms (e|)';
      expectObservable(on$).toBe(expectedOnMarble, expectedOnValues);
      const expectedMarble = '';
      expectObservable(service.observe()).toBe(expectedMarble);
    });

    testScheduler.run(({ expectObservable }) => {
      const expectedOnMarble = '6s a 999ms b 999ms c 999ms d 999ms e';
      service.enterRoom('test');
      expectObservable(service.observe()).toBe(expectedOnMarble, expectedOnValues);
    });
  });

  test('check listen values with observe', () => {
    const expectedOnValues = { a: 0, b: 1, c: 2, d: 3, e: 4 };
    on$ = interval(1000).pipe(take(5));

    testScheduler.run(({ expectObservable }) => {
      const expectedOnMarble = '1s a 999ms b 999ms c 999ms d 999ms e';
      service.enterRoom('test');
      expectObservable(service.observe()).toBe(expectedOnMarble, expectedOnValues);
    });
  });

  test('stop observer when leaving the room', () => {
    const expectedOnValues = { a: 0, b: 1, c: 2, d: 3, e: 4 };
    on$ = interval(1000).pipe(take(5));

    testScheduler.run(({ expectObservable }) => {
      const expectedOnMarble = '1s a 999ms b 999ms c 999ms d 999ms e';
      service.enterRoom('test');
      expectObservable(service.observe()).toBe(expectedOnMarble, expectedOnValues);
    });

    testScheduler.run(({ expectObservable }) => {
      service.enterRoom(null);
      expectObservable(service.observe()).toBe('');
    });
  });

  test('stop observer when leaving the room', () => {
    const expectedOnValues = { a: 0, b: 1, c: 2, d: 3, e: 4 };
    on$ = interval(1000).pipe(take(5));

    testScheduler.run(({ expectObservable }) => {
      const expectedOnMarble = '1s a 999ms b 999ms c 999ms d 999ms e';
      service.enterRoom('test');
      expectObservable(service.observe()).toBe(expectedOnMarble, expectedOnValues);
    });

    testScheduler.run(({ expectObservable }) => {
      service.enterRoom(null);
      expectObservable(service.observe()).toBe('');
    });
  });

  test('when receive a list of array send array one by one', () => {
    const values = valuesGenerator(5);
    on$ = interval(1000).pipe(
      map((i) => values.slice(0, i + 1)),
      take(5),
    );

    testScheduler.run(({ expectObservable }) => {
      service.enterRoom('test');
      const expectedOnMarble = '1s a 999ms b 999ms c 999ms d 999ms e';
      const expectedOnValues = { a: values[0], b: values[1], c: values[2], d: values[3], e: values[4] };
      expectObservable(service.observe()).toBe(expectedOnMarble, expectedOnValues);
    });
  });
});
