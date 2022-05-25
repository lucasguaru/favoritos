function filterByInput(arr, filterInput) {
  if (!filterInput) return arr;
  return arr.filter(item => {
    return contains(item.title, filterInput).found;
  });
}

angular.module('bookmarkApp').
filter('filterByInput', function() {
  return filterByInput;
})