const initialItems = ["Wake up at 7 o'clock", "Read book", "Go to gym"];

let allItems = []; //all items: "completed" + "active"
let activeItems = []; //i.e. not completed yet items

const completedItems = []; //completed items
const foundItems = []; //items that were found by search

let focusedItem;
const list = document.querySelector(".list");
const inputElem = document.getElementById("inputNewElem");
const searchElem = document.getElementById("searchElem");
const btnAllItems = document.querySelector(".btn.allItemsColor");
const btnCompletedItems = document.querySelector(".btn.completedItemsColor");
const btnActiveItems = document.querySelector(".btn.activeItemsColor");
//Add initial default items to the list, when the DOM fully loaded
document.addEventListener("DOMContentLoaded", () => {
  btnAllItems.classList.toggle("focused");
  focusedItem = btnAllItems;
  if (activeItems.length === 0) {
    activeItems = [...initialItems];
    allItems = [...initialItems];
    renderItems(activeItems);
  }
});

//Event listener for the "Add new item" input
inputElem.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const itemText = event.target.value;
    allItems.push(itemText);
    activeItems.length === 0
      ? (activeItems = [...activeItems])
      : activeItems.push(itemText);

    addItem(getNewItem(itemText, activeItems.length));
    event.target.value = "";
  }
});

//Event listener for the "Search" input
searchElem.addEventListener("keyup", (event) => {
  list.textContent = "";
  const enteredVal = event.target.value;
  const pattern = new RegExp(`^.*${enteredVal}.*$`, "i");
  foundItems.length = 0;
  activeItems.forEach((item) => {
    if (pattern.test(item)) foundItems.push(item);
  });
  if (foundItems.length !== 0) renderItems(foundItems);
});

//Event listeners for buttons
btnAllItems.addEventListener("click", () => {
  changeButtonStyle(btnAllItems);
  renderItems(allItems);
});
btnCompletedItems.addEventListener("click", () => {
  changeButtonStyle(btnCompletedItems);
  renderItems(completedItems);
});
btnActiveItems.addEventListener("click", () => {
  changeButtonStyle(btnActiveItems);
  renderItems(activeItems);
});

//Function renders items in the list
function renderItems(items) {
  list.textContent = "";
  items.forEach((item, index) => {
    addItem(getNewItem(item, index));
  });
}

//Function deletes items from the list
function deleteItem(event) {
  const id = event.target.id;
  // activeItems = activeItems.filter((item, index) => index !== id);
  const deletedItem = activeItems.splice(id, 1);
  completedItems.push(deletedItem);
  // document.getElementById(id).remove();
  document.getElementById(id).classList.add("completedItemsColor");
}

//Function creates new item before adding to the list
function getNewItem(text, id) {
  const rawItem = document.createElement("div");
  rawItem.classList.add("list__item");
  rawItem.setAttribute("id", id);
  rawItem.addEventListener("click", deleteItem);
  rawItem.innerHTML = text;
  return rawItem;
}

//Function adds new item to the DOM
function addItem(item) {
  list.append(item);
}

//Function handles view of pressed button
function changeButtonStyle(buttonName) {
  buttonName.classList.toggle("focused");
  focusedItem.classList.toggle("focused");
  focusedItem = buttonName;
}

// switch (listName) {
//   case allItems:
//     rawItem.classList.add("allItemsColor");
//     break;
//   case btnActiveItems:
//     rawItem.classList.add("activeItemsColor");
//     break;
//   case btnCompletedItems:
//     rawItem.classList.add("completedItemsColor");
//     break;
// }
