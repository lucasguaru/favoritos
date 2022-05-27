angular.module('bookmarkApp').
controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  vm.selected = 0;
  vm.newItem = {};
  vm.newMode = false;
  vm.editMode = false;

  let bookmarks = loadStorageBookmarks();
  if (!bookmarks) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(bookmarks);
  }  
  vm.bookmarks = bookmarks;
  vm.filteredBookmarks = vm.bookmarks;
  vm.tags = loadTags(vm.filteredBookmarks);

  vm.saveItem = function(item) {
    if (vm.newMode) {
      vm.bookmarks.push(item);
    }
    saveStorageBookmarks();
    vm.newItem = {};
    vm.newMode = false;
    vm.editMode = false;
  }

  vm.edit = function(event, index) {
    // console.log(event);
    event.stopPropagation();
    vm.newItem = vm.filteredBookmarks[index];
    vm.editMode = true;
  }

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
   }

  vm.export = function() {
    download(JSON.stringify(vm.filteredBookmarks), "filtered-bookmark.json", "text/plain");
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
      
      saveStorageBookmarks();
    }
  }

  function getSelectedTags() {
    return vm.tags.filter(t => t.selected);
  }

  vm.filter = function(event) {
    if (event && vm.isCommandKey(event)) return;
    vm.filteredBookmarks = filterByInput(vm.bookmarks, vm.bookmarkSearch, getSelectedTags());
    vm.selected = 0;
  }

  vm.filterOnlyUnused = function(allTags, alreadySelectedTags) {
    return allTags.filter(t => !alreadySelectedTags.includes(t.name));
  }

  vm.addTag = function() {
    let arrTags = vm.newItem.tags || [];
    vm.newItem.tags = arrTags;

    if (vm.newItem.tagSelection == '9999') {
      vm.newItem.tags.push(vm.newItem.inputNewTag);
    } else {
      vm.newItem.tags.push(vm.tags[vm.newItem.tagSelection].name);
    }
    // item.tags vm.tags[item.tagSelection];
  }
  
  vm.deleteTagItem = function(index) {
    vm.newItem.tags.splice(index, 1);
  }

  vm.isCommandKey = function(event) {
    // console.log({length: vm.filteredBookmarks.length, selected: vm.selected});
    if (moveDown(event)) {
      return true;
    }
    if (moveUp(event)) {
      return true;
    }
    if (isOpenPage(event)) {
      return true;
    }
    if (hotKeyTag(event)) {
      return true;
    }
    // console.log(event);
    return false;
  }

  vm.selectHotkey = function(tag) {
    tag.selected = !tag.selected;
    vm.filter();
  }

  function hotKeyTag(event) {
    if (!(event.altKey && between(event.keyCode, 49, 57))) return false;

    let pos = event.keyCode - 49;
    vm.selectHotkey(vm.tags[pos]);

    return true;
  }
  function moveDown(event) {
    if (event.key != 'ArrowDown') return false;

    if (vm.selected < vm.filteredBookmarks.length -1) {
      vm.selected++;
    }
    return true;
  }
  function moveUp(event) {
    if (event.key != 'ArrowUp') return false;

    if (vm.selected > 0) {
      vm.selected--;
    }
    return true;
  }
  function isOpenPage(event) {
    if (event.key != 'Enter') return false;

    vm.openPage(vm.filteredBookmarks[vm.selected]);
    return true;
  }

  function loadTags(bookmarks) {
    let tags = [];
    bookmarks.forEach(b => {
      if (Array.isArray(b.tags)) {
        tags = tags.concat(b.tags.map(t => ({name: t, selected: false})));
      } else {
        tags.push({name: b.tags, selected: false});
      }
    });
    return [...new Set(tags)];
  }

  function saveStorageBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(vm.bookmarks));
  }

  function loadStorageBookmarks() {
    const bookmarks = localStorage.getItem("bookmarks");
    console.log(`localStorage.setItem("bookmarks", ${bookmarks})`);
    return bookmarks;
  }

  function between(value, start, end) {
    return value >= start && value <= end;
  }
  

  // function loadStorageTags() {
  //   const tags = localStorage.getItem("tags");
  //   console.log(`localStorage.setItem("tags", ${tags})`);
  //   return tags;
  // }

  //JSON.parse(localStorage.getItem("bookmarks"))
});