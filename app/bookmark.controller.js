angular.module('bookmarkApp').
controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  vm.selected = 0;

  let bookmarks = localStorage.getItem("bookmarks");
  if (!bookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(bookmarks);
  }

  vm.bookmarks = bookmarks;
});