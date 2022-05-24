angular.module('bookmarkApp').
controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  let bookmarks = localStorage.getItem("bookmarks");
  if (!bookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(bookmarks);
  }

  vm.bookmarks = bookmarks;
});

bookmarkApp.filter('filterByInput', function() {
  function break3Letters(filterInput) {
    let res = [];
    while (filterInput.length > 3)  {
      res.push(filterInput.substring(0, 3));
      filterInput = filterInput.substring(3);
    }
    res.push(filterInput);
    return res;
  }
  function contains(full, filterInput) {
    let words = break3Letters(filterInput.toLowerCase());
    let found = true;
    for (let i = 0; i < words.length; i++) {
      if (full.toLowerCase().indexOf(words[i]) < 0) {
        found = false;
        break;
      }
    }
    return found;
  }

  return function(arr, filterInput) {
    if (!filterInput) return arr;
    return arr.filter(item => {
      return contains(item.title, filterInput);
    })

  }
})