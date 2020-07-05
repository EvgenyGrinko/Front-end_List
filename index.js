
const initialItems = ["Wake up at 7 o'clock", "Read book", "Go to gym"];
let listItems = [];
const foundItems = [];
const list = document.querySelector(".list");
const inputElem = document.getElementById("inputNewElem");
const searchElem = document.getElementById("searchElem");

document.addEventListener("DOMContentLoaded", ()=>{
  if (listItems.length === 0) {
    listItems = [...initialItems];
    renderItems(listItems);
   }else renderItems(listItems);
});

inputElem.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const itemText = event.target.value;
    listItems.push(itemText);
    addItem(getNewItem(itemText, listItems.length));
    event.target.value = "";
  }
});

searchElem.addEventListener("keyup", (event) => {
  const enteredVal = event.target.value;
  const pattern = new RegExp(`^.*${enteredVal}.*$`, "i");
  listItems.forEach((item) => {
    if (pattern.test(item)) foundItems.push(item);
  });
  if (foundItems.length !== 0) renderItems(foundItems);
});

function renderItems(items){
  items.forEach((item, index) => {
    addItem(getNewItem(item, index));
  });
}

function handleItemClick(event) {
  const id = event.target.id;
  listItems.splice(id, 1);
  document.getElementById(id).remove();
}

function getNewItem(text, id){
  const rawItem = document.createElement("div");
  rawItem.setAttribute("class", "list__item");
  rawItem.setAttribute("id", id);
  rawItem.addEventListener("click", handleItemClick);
  rawItem.innerHTML = text;
  return rawItem;
}

function addItem(item){
  list.append(item);
}