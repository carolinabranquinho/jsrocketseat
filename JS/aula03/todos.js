var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list')) || ['Faça alguma coisa'];

function renderTodos(){
    listElement.innerHTML = '';

    for ( todo of todos ) {
        var listItem = document.createElement('li');
        var listText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        var pos = todos.indexOf(todo);

        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);

        listItem.appendChild(listText);
        listItem.appendChild(linkElement);
        listElement.appendChild(listItem);    
    }
}

renderTodos();

function addTodo() {
    var todo = inputElement.value;
    todos.push(todo);
    inputElement.value = '';

    renderTodos();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos){
    todos.splice(pos, 1);
    renderTodos();
}

function saveToStorage() {
    localStorage.setItem('list', JSON.stringify(todos));
}