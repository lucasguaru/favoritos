function contains(title, filterInput) {
  filterInput = filterInput.toLowerCase();
  let found = true;
  let posTitle = 0;
  let arrPos = [];
  for (let i = 0; i < filterInput.length;) {
    let letter = filterInput[i].toUpperCase();
    if (!title.includes(letter, posTitle)) {
      found = false;
      break;
    }
    posTitle = title.indexOf(letter, posTitle);
    arrPos.push(posTitle);
    i++;

    //iterante over next letters
    while(title.charAt(posTitle + 1) == filterInput[i]) {
      arrPos.push(++posTitle);
      i++;
    }
  }
  return {found, positions: arrPos};
}
