export function aggregateRange(numbers) {
  if (!numbers || numbers.length === 0) {
    return { sum: 0, average: 0, count: 0 };
  }

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const count = numbers.length;
  const average = Number((sum / count).toFixed(1));

  return { sum, average, count };
}
