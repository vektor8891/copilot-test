/**
 * Validates a 2D array of numbers.
 * 
 * @param numbers - The 2D array of numbers to validate.
 * @throws Error if any element in the array does not have the correct length.
 */
export function validateNumbers(numbers: number[][]) {
    const length = numbers.length;
    if (length === 0) {
      throw new Error("Array is empty");
    }
    if (!numbers.every((number_rows) => number_rows.length === length)) {
      throw new Error("All elements have the correct length");
    }
  }
