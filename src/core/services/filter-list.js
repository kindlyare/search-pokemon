export default (list, filterPredicates) => {
  let filterResult = list
  for (const predicate of filterPredicates) {
    if (predicate) {
      filterResult = filterResult.filter(predicate)
    }
  }
  return filterResult
}