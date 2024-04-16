let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo="";


let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

/* Creating a function to get unique id */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param) {
        let number = Math.random() * 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}
    

addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    todo = todoInput.value;
    if(todo.length > 0){
        todoList.push({id: uuid(), todo: todo, isCompleted: false});  // Creating an array of objects
    }
    renderTodoList(todoList);
    localStorage.setItem("todos", JSON.stringify(todoList));
    todoInput.value = "";
})

showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo);
    todoList = todoList.filter(todo => todo.id !== delTodokey);
    localStorage.setItem("todos", JSON.stringify(todoList));
    renderTodoList(todoList);
    console.log(todoList);
})

function renderTodoList(todoList) {
    console.log(todoList);
    /* const todo = {id: 123, todo: "Sky", isCompleted: false}👇 */
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) =>
    `<div class="todo relative"> 
        <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""}> 
        <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for="item-${id}"> 
          ${todo} 
        </label> 
        <button class="absolute right-0 button cursor">
           <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
        </button> 
    </div>`
)}

renderTodoList(todoList);

