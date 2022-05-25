angular.module('bookmarkApp').
filter('colorByInput', ['$sce', function($sce) {
  return function(text, filterInput) {
    if (!filterInput) return $sce.trustAsHtml(text);
    let positions = contains(text, filterInput).positions;
    if (positions.length == 0) return text;

    let newText = "";
    text.split("").forEach((letter, index) => {
      if (!positions.includes(index)) {
        newText += letter;
      } else {
        newText += `<span class="spotlight">${letter}</span>`;
        positions = positions.slice(1);
      }
    })

    return $sce.trustAsHtml(newText);
  }
}])