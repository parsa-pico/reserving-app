export function sortByPersianDate(array) {
  return array.sort((a, b) => {
    a = a.date.split("/").join("");
    b = b.date.split("/").join("");
    a = parseInt(a);
    b = parseInt(b);
    return a - b;
  });
}
