angular.module('bookmarkApp').
filter('filterByInput', function() {
  return function(arr, filterInput) {
    if (!filterInput) return arr;
    return arr.filter(item => {
      return contains(item.title, filterInput).found;
    });
  }
})