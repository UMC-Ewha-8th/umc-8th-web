//how to do
// 1. HTML 요소 선택(ts에서는 요소를 뒤에 as ~ define해줘야함)
const todoInput=document.getElementById('todo-input') as HTMLInputElement;
const todoForm=document.getElementById('todo-form') as HTMLFormElement;
const todoList=document.getElementById('todo-list') as HTMLUListElement;
const doneList=document.getElementById('done-list') as HTMLUListElement;
// 2. 할 일의 type 정의 : 할 일 목록 렌더링 하는 함수 정의
// 배열로 받는게 편하니까 Todo라는 type에서 배열로 정의
type Todo={
    id:number;
    text:string;
};

let todos:Todo[]=[];
let doneTasks:Todo[]=[];

//rendering function : 입력한 텍스트 할일 완료에 꺼내주는거
const renderTask=():void=>{
    todoList.innerHTML='';
    doneList.innerHTML='';

    todos.forEach((todo):void=>{
        const li=createTodoElement(todo,false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo):void=>{
        const li=createTodoElement(todo,true);
        doneList.appendChild(li);
    });
};

// 3. 할 일 텍스트 입력 처리 함수
// 공백 처리 함수
const getTodoText=():string=>{
    return todoInput.value.trim();
};
// 4. 할 일 추가 처리 함수
const addTodo=(text:string):void=>{
    todos.push({id:Date.now(),text});
    todoInput.value='';
    renderTask();
};
// 5. 할 일 상태 변경(완료로 이동)
// 그니까 filtering이 내가 클릭한 id있는 애 말고 다른 애들(!=인 todo.id)을 rendering시켜주는것
const completeTodo=(todo:Todo):void=>{
    todos=todos.filter((t):Boolean=>t.id!==todo.id); 
    doneTasks.push(todo); // 해당 todo를 완료task로 밀어넣기
    renderTask();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo=(todo:Todo):void=>{
    doneTasks=doneTasks.filter((t):Boolean=>t.id!==todo.id); 
    renderTask();
};

// 7. 할 일 아이템 생성 함수(완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement=(todo:Todo,isDone:boolean):HTMLLIElement=>{
    const li=document.createElement("li");
    li.classList.add('render-container__item');
    li.textContent=todo.text;

    const button=document.createElement('button');
    button.classList.add('render-container__item-button');

    // 완료일때는 빨간 버튼
    if(isDone){
        button.textContent='삭제';
        button.style.backgroundColor="#dc3545";
    }
    else{
        button.textContent='완료';
        button.style.backgroundColor="#28a745";
    }
    button.addEventListener('click',():void=>{
        if(isDone){
            deleteTodo(todo);
        }
        else{
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
    
};
 //<li class="render-container__item">
    //<p class="render-container__item-text">123</p>
      // <button class="render-container__item-button">del</button>
//</li>

// 8. 폼 제출 이벤트 리스너
// 아직 값이 db랑 연결 안되서 
todoForm.addEventListener('submit',(event:Event):void=>{
    event.preventDefault();
    const text =getTodoText();
    if(text){
        addTodo(text);
    }
});

renderTask();