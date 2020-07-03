
const initialItems = ["Wake up at 7 o'clock", "Read book", "Go to gym"];
const list = document.querySelector(".list");

initialItems.forEach((item, index) => {
  const rawItem = document.createElement("div");
  rawItem.setAttribute("class", "list__item");
  rawItem.setAttribute("id", index);
  rawItem.addEventListener("click", handleItemClick);
  rawItem.innerHTML = item;
  list.append(rawItem);
});

function handleItemClick(event) {
  const id = event.target.id;
  items.splice(id, 1);
  console.log(items);
}
