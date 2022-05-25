angular.module('bookmarkApp').
controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  vm.selected = 0;
  vm.newItem = {};

  let bookmarks = localStorage.getItem("bookmarks");
  console.log(`localStorage.setItem("bookmarks", ${bookmarks})`);
  if (!bookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(bookmarks);
  }

  vm.saveItem = function(item) {
    vm.bookmarks.push(item);
    localStorage.setItem("bookmarks", JSON.stringify(vm.bookmarks));
    vm.newItem = {};
  }

  vm.bookmarks = bookmarks;
});