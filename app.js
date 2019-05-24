const addItems = document.querySelector('.btn-add');
const itemsList = document.querySelector('.todos');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem() {
    const text = document.querySelector('.input-todo').value;
    const item = {
        text,
        done: false
    };

    if (text === '') return;
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    document.querySelector('.input-todo').value = '';
}

function populateList(todos = [], todosList) {
    todosList.innerHTML = todos.map((todo, i) => {
        return `
        <li class="list-group-item todo" id="${i}">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input btn-done" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
                <label class="custom-control-label todo-title" for="item${i}">${todo.text}</label>
                <button class="btn btn-outline-danger btn-sm float-right todo-delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </li>
    `;
    }).join('');
}

function deleteTodo(e) {
    if (!e.target.matches('button')) return;
    const itemID = e.target.parentNode.parentNode.id;
    if (itemID !== -1) {
        items.splice(itemID, 1);
    }
    const el = document.getElementById(itemID);
    el.parentNode.removeChild(el);
    localStorage.setItem('items', JSON.stringify(items));
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('click', addItem);
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        addItem();
    }
});
itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', deleteTodo);

populateList(items, itemsList);
