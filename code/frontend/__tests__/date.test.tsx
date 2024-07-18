import {convertToOrdinal} from '../src/utils/date';

describe('convertToOrdinal function', () => {
  test('returns correct ordinal string for numbers ending in 1', () => {
    expect(convertToOrdinal(1)).toBe('1st');
    expect(convertToOrdinal(11)).toBe('11th');
    expect(convertToOrdinal(21)).toBe('21st');
    expect(convertToOrdinal(31)).toBe('31st');
  });

  test('returns correct ordinal string for numbers ending in 2', () => {
    expect(convertToOrdinal(2)).toBe('2nd');
    expect(convertToOrdinal(12)).toBe('12th');
    expect(convertToOrdinal(22)).toBe('22nd');
  });

  test('returns correct ordinal string for numbers ending in 3', () => {
    expect(convertToOrdinal(3)).toBe('3rd');
    expect(convertToOrdinal(13)).toBe('13th');
    expect(convertToOrdinal(23)).toBe('23rd');
  });

  test('returns correct ordinal string for numbers ending in other digits', () => {
    expect(convertToOrdinal(4)).toBe('4th');
    expect(convertToOrdinal(7)).toBe('7th');
    expect(convertToOrdinal(19)).toBe('19th');
    expect(convertToOrdinal(25)).toBe('25th');
  });

  test('returns correct ordinal string for edge cases', () => {
    expect(convertToOrdinal(0)).toBe('0th');
    expect(convertToOrdinal(100)).toBe('100th');
    expect(convertToOrdinal(101)).toBe('101st');
    expect(convertToOrdinal(112)).toBe('112th');
  });
});