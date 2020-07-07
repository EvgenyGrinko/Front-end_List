const list = document.getElementById("list");
const form = document.getElementById("submit-form");
const addElem = document.getElementById("addElem");
const searchElem = document.getElementById("searchElem");
const btnAllItems = document.getElementById("btnAllItems");
const btnActiveItems = document.getElementById("btnActiveItems");
const btnCompletedItems = document.getElementById("btnCompletedItems");
let focusedBtn = btnAllItems; //reference to the button, that has class "focused"
let id = 0;

//Event listener for the Form (ID="submit-form")
form.addEventListener("submit", (event) => {
  const addValue = form.children[0].value;
  const template = `
    <div id= ${id} class="list__item activeItems">
      <div class="list__item_text">${addValue}</div>
      <span class="list__item_checkBtn"></span>
    </div>
  `;
  if (addValue) {
    list.innerHTML += template;
    id++;
    addElem.value = "";
    return;
  }
  event.preventDefault();
});

//Event listener for the List (ID="list")
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("list__item_checkBtn")) {
    event.target.closest(".list__item").remove();
  }
  if (event.target.classList.contains("list__item_text")) {
    event.target.parentElement.classList.add("completedItems");
    event.target.parentElement.classList.remove("activeItems");
  }
});

//Event listener for the "Search" input (ID="searchElem")
//It renders only items specific for the area.
searchElem.addEventListener("keyup", (event) => {
  const enteredVal = event.target.value;
  const pattern = new RegExp(`^.*${enteredVal}.*$`, "i");
  const items = Array.from(list.children);
  const area = focusedBtn.classList[1];

  items.forEach((item) => {
    item.classList.add("hide-elem");
  });
  if (area === "allItems") {
    items.forEach((item) => {
      if (pattern.test(item.children[0].innerHTML))
        item.classList.remove("hide-elem");
    });
  }
  items.forEach((item) => {
    if (
      item.classList.contains(area) &&
      pattern.test(item.children[0].innerHTML)
    )
      item.classList.remove("hide-elem");
  });
});

//Event listeners for buttons (IDs: "btnAllItems", "btnActiveItems", "btnCompletedItems")
btnAllItems.addEventListener("click", () => {
  changeButtonStyle(btnAllItems);
  renderSpecific(focusedBtn);
});
btnActiveItems.addEventListener("click", () => {
  changeButtonStyle(btnActiveItems);
  renderSpecific(focusedBtn);
});
btnCompletedItems.addEventListener("click", () => {
  changeButtonStyle(btnCompletedItems);
  renderSpecific(focusedBtn);
});

//Function renders items on the list, depending on the area focused in this moment.
//It depends on the button that has class "focused" (btn IDs: "btnAllItems", "btnActiveItems", "btnCompletedItems").
function renderSpecific(focusedArea) {
  const area = focusedArea.classList[1];
  Array.from(list.children).forEach((item) => {
    if (!(area === "allItems") && !item.classList.contains(area))
      item.classList.add("hide-elem");
    else item.classList.remove("hide-elem");
  });
}

//Function handles view of pressed button and chnages reference to the "focused" button
function changeButtonStyle(buttonName) {
  buttonName.classList.toggle("focused");
  focusedBtn.classList.toggle("focused");
  focusedBtn = buttonName;
}
