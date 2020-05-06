import { uid } from '../uid';

describe('uid', () => {
  test('should generate differents ids', () => {
    const ids = Array.from({ length: 100 }).map(() => uid());
    ids.forEach((id) => {
      const sameIds = ids.filter((i) => i === id);
      expect(sameIds.length).toBe(1);
    });
  });

  test('should generate id with differente length', () => {
    expect(uid(4).length).toBe(4);
    expect(uid(8).length).toBe(8);
    expect(uid(6).length).toBe(6);
    expect(uid(12).length).toBe(12);
    expect(uid(10).length).toBe(10);
    expect(uid(20).length).toBe(20);
  });
});
