export function paginate (items, currentPage, pageSize) {
  return items.slice(
    currentPage * pageSize - pageSize,
    currentPage * pageSize
  );
}