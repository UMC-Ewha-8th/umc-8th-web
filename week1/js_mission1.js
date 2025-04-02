document
  .querySelector("#todoInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
      event.preventDefault(); // Enter 입력 시 form 제출 방지
      createTodo();
    }
  });

function createTodo() {
  const todoInput = document.querySelector("#todoInput");
  const todoList = document.querySelector("#todoList");

  // 새로운 할 일 아이템 생성
  const newLi = document.createElement("li");
  newLi.classList.add("item_container");

  const newSpan = document.createElement("span");
  newSpan.textContent = todoInput.value.trim();

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.classList.add("item_button");
  completeBtn.onclick = function () {
    moveToDone(newLi);
  };

  newLi.appendChild(newSpan);
  newLi.appendChild(completeBtn);

  todoList.appendChild(newLi);

  // 입력창 초기화
  todoInput.value = "";
}

function moveToDone(item) {
  const doneList = document.querySelector("#doneList");

  // 완료 버튼 제거
  const buttons = item.querySelectorAll("button");
  buttons.forEach((btn) => btn.remove());

  // 삭제 버튼 추가
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("item_button");
  deleteBtn.onclick = function () {
    item.remove();
  };

  item.appendChild(deleteBtn);
  doneList.appendChild(item);
}
