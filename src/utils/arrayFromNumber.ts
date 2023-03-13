export default function arrayFromNumber(n: number): Array<number> {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
}
