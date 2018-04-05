import { formatElapsedTime } from '../helpers/formatElapsedTime';

test('It should return 00:00:00 for invalid number', () => {
  const res = formatElapsedTime('aabefefe');
  expect(res).toBe('00:00:00');
});

test('It should return 00:00:00 format for less than 1 hour', () => {
  const res = formatElapsedTime(129100);
  expect(res).toBe('02:09.10');
});

test('It should return 00:00:00:00 format for more than 1 hour', () => {
  const res = formatElapsedTime(100000000);
  expect(res).toBe('27:46:40.00');
});
