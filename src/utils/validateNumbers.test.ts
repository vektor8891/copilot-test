import { validateNumbers } from './validateNumbers';

describe('validateNumbers', () => {
  it('should not throw an error for a valid 2D array', () => {
    const validArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    expect(() => validateNumbers(validArray)).not.toThrow();
  });

  it('should throw an error if any row does not have the correct length', () => {
    const invalidArray = [
      [1, 2, 3],
      [4, 5],
      [7, 8, 9]
    ];
    expect(() => validateNumbers(invalidArray)).toThrow("All elements have the correct length");
  });

  it('should throw an error if the array is empty', () => {
    const emptyArray: number[][] = [];
    expect(() => validateNumbers(emptyArray)).toThrow("Array is empty");
  });

  it('should not throw an error for a single row array', () => {
    const singleRowArray = [
      [1]
    ];
    expect(() => validateNumbers(singleRowArray)).not.toThrow();
  });

  it('should throw an error if rows have different lengths', () => {
    const differentLengthsArray = [
      [1, 2],
      [3, 4, 5]
    ];
    expect(() => validateNumbers(differentLengthsArray)).toThrow("All elements have the correct length");
  });
});