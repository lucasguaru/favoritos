angular.module('bookmarkApp').
controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  vm.selected = 0;
  vm.newItem = {};
  vm.editMode = false;

  let bookmarks = loadStorage();
  if (!bookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(bookmarks);
  }  
  vm.bookmarks = bookmarks;
  vm.filteredBookmarks = vm.bookmarks;

  vm.saveItem = function(item) {
    vm.bookmarks.push(item);
    saveStorage();
    vm.newItem = {};
    vm.editMode = false;
  }

  vm.filter = function(event, search) {
    if (vm.isCommandKey(event)) return;
    vm.filteredBookmarks = filterByInput(vm.bookmarks, search);
    vm.selected = 0;
  }

  vm.openPage = function(bookmark) {
    bookmark.qtyClicks = (bookmark.qtyClicks || 0) + 1;
    pushToSearchList(bookmark);
    window.open(bookmark.url, '_blank', 'noopener,noreferrer,');

    function pushToSearchList(bookmark) {
      bookmark.searchList = bookmark.searchList || [];
      const found = bookmark.searchList.find(input => input.search == vm.search);
      if (found) {
        found.qty++;
      } else {
        bookmark.searchList.push({search: vm.search, qty: 1});
      }
      
      saveStorage();
    }
  }

  vm.isCommandKey = function(event) {
    // console.log({length: vm.filteredBookmarks.length, selected: vm.selected});
    if (event.key == 'ArrowDown') {
      if (vm.selected < vm.filteredBookmarks.length -1) {
        vm.selected++;
      }
      return true;
    }
    if (event.key == 'ArrowUp') {
      if (vm.selected > 0) {
        vm.selected--;
      }
      return true;
    }
    if (event.key == 'Enter') {
      vm.openPage(vm.filteredBookmarks[vm.selected]);
      return true;
    }
    console.log(event);
    return false;
  }


  function saveStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(vm.bookmarks));
  }

  function loadStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    console.log(`localStorage.setItem("bookmarks", ${bookmarks})`);
    return bookmarks;
  }

  //JSON.parse(localStorage.getItem("bookmarks"))
});