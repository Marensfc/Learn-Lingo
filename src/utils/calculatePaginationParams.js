export function calculatePaginationParams(perPage = 4, page = 1, filters) {
  const isThereAnyFilter = Boolean(
    Object.values(filters).find(filter => filter !== 'All')
  );

  if (isThereAnyFilter) {
    return {
      startAt: perPage * page - perPage,
      endAt: perPage * page,
      isFirstPage: page === 1,
      perPage,
      isThereAnyFilter,
      filters,
    };
  } else {
    const endAt = page * perPage - 1;
    const startAt = endAt - (perPage - 1);

    return {
      startAt,
      endAt,
      isFirstPage: page === 1,
      perPage,
      isThereAnyFilter: false,
    };
  }
}
