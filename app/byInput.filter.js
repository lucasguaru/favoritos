function filterByInput(arr, filterInput, selectedTags) {
  let resultArray = arr;
  if (selectedTags && selectedTags.length) {
    resultArray = resultArray.filter(item => selectedTags.every(v => item.tags.includes(v.name)));
  }
  if (!filterInput) return resultArray;
  return resultArray.filter(item => {
    return contains(item.title, filterInput).found;
  });
}

angular.module('bookmarkApp').
filter('filterByInput', function() {
  return filterByInput;
})