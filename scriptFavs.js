const listOfItemsID = document.getElementById('listOfItemsID');
const favsLocal = localStorage.getItem('favoritos').split(";");

function populateList(itemList) {
  itemList.innerHTML = favsLocal.map((item, i) => {
    return `
		  <li>
		  <label for="item${i}">${item}</label><span data-index=${i} id="removed${i}" ${item.deleted ? true : false}>x</span>
		  </li>
	 `;
  }).join('');
}

function removeItemFn(e) {
  if (!e.target.matches('span')) return;
  const element = e.target;
  const ind = element.dataset.index;
  favsLocal[ind].deleted = !favsLocal[ind].deleted;
  console.log(favsLocal[ind].deleted);
  favsLocal.splice([ind], 1);
  localStorage.setItem('favoritos', JSON.stringify(favsLocal));
  if (JSON.parse(localStorage.getItem('favoritos')).length == 0) {
    localStorage.removeItem('favoritos');
  }
  populateList(listOfItemsID);
}

listOfItemsID.addEventListener('click', removeItemFn);

populateList(listOfItemsID);
