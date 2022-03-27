
function getAnnouncements() {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((wizards) => wizards);
}

export { getAnnouncements };
