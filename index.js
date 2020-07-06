const initialItems = ["Wake up at 7 o'clock", "Read book", "Go to gym"];

const allItems = []; //all items: "completed" + "active"
const activeItems = new Set(); //i.e. not completed yet items
const completedItems = new Set(); //completed items
const foundItems = new Set(); //items that were found by search

let focusedBtn; //reference to the button, that has class "focused"
const list = document.querySelector(".list");
const inputElem = document.getElementById("inputNewElem");
const searchElem = document.getElementById("searchElem");
const btnAllItems = document.getElementById("btnAllItems");
const btnActiveItems = document.getElementById("btnActiveItems");
const btnCompletedItems = document.getElementById("btnCompletedItems");

//Add initial default items to the list, when the DOM fully loaded
document.addEventListener("DOMContentLoaded", () => {
  btnAllItems.classList.toggle("focused");
  focusedBtn = btnAllItems;
  initialItems.forEach((item, index) => {
    allItems.push(getNewItem(item, index, "activeItemsColor"));
    activeItems.add(index);
  });
  renderItemsOn(focusedBtn.id);
});

//Event listener for the "Add new item" input
inputElem.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const itemText = event.target.value;
    if (itemText !== "") {
      allItems.push(getNewItem(itemText, allItems.length, "activeItemsColor"));
      activeItems.add(allItems.length - 1);
      renderItemsOn(focusedBtn.id);
      event.target.value = "";
    }
  }
});

//Event listener for the "Search" input
searchElem.addEventListener("keyup", (event) => {
  list.textContent = ""; //remove all items from the "list"
  const enteredVal = event.target.value;
  const pattern = new RegExp(`^.*${enteredVal}.*$`, "i");
  foundItems.clear();
  allItems.forEach((item, index) => {
    if (pattern.test(item.innerText)) foundItems.add(index);
  });
  if (foundItems.size !== 0) renderItemsOn(focusedBtn.id, foundItems);
});

//Event listeners for buttons
btnAllItems.addEventListener("click", () => {
  changeButtonStyle(btnAllItems);
  renderItemsOn(focusedBtn.id);
});
btnCompletedItems.addEventListener("click", () => {
  changeButtonStyle(btnCompletedItems);
  renderItemsOn(focusedBtn.id);
});
btnActiveItems.addEventListener("click", () => {
  changeButtonStyle(btnActiveItems);
  renderItemsOn(focusedBtn.id);
});

//Function renders items on the list, depending on the area focused in this moment.
//It depends on the button that has class "focused" (btn IDs: "btnAllItems", "btnActiveItems", "btnCompletedItems").
//It also consideres, whether the search was made and if it was, it renders only found items, depending on the area.
function renderItemsOn(btnFocused, foundItems = false) {
  list.textContent = ""; //remove all items from the "list"
  switch (btnFocused) {
    case "btnAllItems":
      if (foundItems) {
        allItems.forEach((item, index) => {
          if (foundItems.has(index)) list.append(item);
        });
      } else {
        allItems.forEach((item) => {
          list.append(item);
        });
      }
      break;
    case "btnActiveItems":
      if (foundItems) {
        allItems.forEach((item, index) => {
          if (foundItems.has(index) && activeItems.has(index))
            list.append(item);
        });
      } else {
        allItems.forEach((item, index) => {
          if (activeItems.has(index)) list.append(item);
        });
      }
      break;
    case "btnCompletedItems":
      if (foundItems) {
        allItems.forEach((item, index) => {
          if (foundItems.has(index) && completedItems.has(index))
            list.append(item);
        });
      } else {
        allItems.forEach((item, index) => {
          if (completedItems.has(index)) list.append(item);
        });
      }
      break;
  }
}

//Function handles click on "list__item_checkBtn" button
function completeItem(event) {
  const id = Number(event.path[1].id);
  completedItems.add(id);
  activeItems.delete(id);
  document.getElementById(id).classList.add("completedItemsColor");
}

//Function creates new item before adding to the list
function getNewItem(text, id, textStyleClass) {
  const rawItem = document.createElement("div");
  const itemText = document.createElement("div");
  const itemBtn = document.createElement("button");
  rawItem.classList.add("list__item");
  rawItem.classList.add(textStyleClass);
  rawItem.setAttribute("id", id);
  itemText.classList.add("list__item_text");
  itemText.innerHTML = text;
  itemBtn.classList.add("list__item_checkBtn");
  itemBtn.addEventListener("click", completeItem);
  rawItem.append(itemText, itemBtn);
  return rawItem;
}

//Function handles view of pressed button and chnages reference to the "focused" button
function changeButtonStyle(buttonName) {
  buttonName.classList.toggle("focused");
  focusedBtn.classList.toggle("focused");
  focusedBtn = buttonName;
}
