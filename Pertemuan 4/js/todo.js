function _id(id){
    return document.getElementById(id)
}

function _class(className){
    return document.getElementsByClassName(className)
}

const inputTodo = _id('todo-title')
const addButton = _id('todo-add-btn')
const inputSearch = _id('todo-search')
const searchButton = _id('todo-search-btn')
const todoGallery = _id('todo-gallery')

addButton.addEventListener('click', addTodo)
searchButton.addEventListener('click', searchTodo)

const todoList = JSON.parse(localStorage.getItem('todoData')) ?? []; // Menyimpan list todo yang ada

const noFilterBtn = _id('no-filter-btn')
const progressBtn = _id('on-progress-btn')
const completedBtn = _id('completed-btn')

noFilterBtn.addEventListener('change', () => updateGallery())
progressBtn.addEventListener('change', () => updateGallery())
completedBtn.addEventListener('change', () => updateGallery())

function setChecked(id, checked){
    todoList.forEach(function(todo){
        if(todo.id === id){
            todo.checked = checked;
        }
    })
    _id(`todo-name-${id}`).classList.toggle('strikethrough');
    updateGallery()
    saveTodo()
}

function toggleButtonFn(button){
    button.classList.toggle('active')
}

function generateTodoCard(todo){
    const todoCard = document.createElement('div')
    todoCard.className = 'todo'
    todoCard.id = `todo-${todo.id}`
    todoCard.innerHTML = `
        <div class="todo-card">
            <input type="checkbox" name="todo-checked" id="todo-check-${todo.id}" che>
            <input type="text" name="todo-title" class="${todo.checked ? 'strikethrough' : ''}" id="todo-name-${todo.id}" value="${todo.title}" readonly>
            <button id="toggle-btn-${todo.id}">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </button>
        </div>
        <div class="button-wrapper" id="button-wrapper-${todo.id}">
            <button id="edit-btn-${todo.id}">
                <i class="fa fa-edit" aria-hidden="true"></i>
            </button>
            <button class="delete-btn" id="delete-btn-${todo.id}">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    `
    todoGallery.append(todoCard)

    // Di Module JS tidak bisa menambahkan event secara inline melalui innerHTML karena function tidak dibuat global
    const checkbox = _id(`todo-check-${todo.id}`)
    checkbox.checked = todo.checked
    checkbox.addEventListener('change', (e) => setChecked(todo.id, e.target.checked))

    const toggleButton = _id(`toggle-btn-${todo.id}`)
    toggleButton.addEventListener('click', () => toggleButtonFn(_id(`button-wrapper-${todo.id}`)))

    const editButton = _id(`edit-btn-${todo.id}`)
    editButton.addEventListener('click', () => updateTodo(todo.id))

    const deleteButton = _id(`delete-btn-${todo.id}`)
    deleteButton.addEventListener('click', () => removeTodo(todo.id))

    return todoCard
}

function updateGallery(list = todoList){
    const nofilter = noFilterBtn.checked
    const onProgress = progressBtn.checked
    const completed = completedBtn.checked

    const filteredList = list.filter(todo => nofilter || todo.checked === completed || !todo.checked === onProgress)

    todoGallery.innerHTML = ""
    filteredList.forEach(todo => {
        todoGallery.append(generateTodoCard(todo))
    })
}

function saveTodo() {
    localStorage.setItem('todoData', JSON.stringify(todoList))
}

function addTodo(){
    const title = inputTodo.value
    if(title.length === 0) return

    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        checked: false
    }

    todoList.push(newTodo)
    updateGallery()
    saveTodo()

    inputTodo.value = ""
}

function searchTodo(){
    const searchString = inputSearch.value
    const filteredList = todoList.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase()))

    updateGallery(filteredList)
}   

function updateTodo(id){
    const titleField = _id(`todo-name-${id}`);
    titleField.readOnly = false;
    titleField.focus();
    titleField.setSelectionRange(-1, -1);
    titleField.onkeydown = function(e){
        if(e.key === "Enter"){
            if(!titleField.value) return alert("Title cannot be empty!")
            todoList.forEach(function(todo){
                if(todo.id === id){
                    todo.title = titleField.value;
                    // console.log(todo);
                }
            })
            saveTodo()
            titleField.readOnly = true;
            this.onkeydown = null;
        }
    }
}

function removeTodo(id){
    // find() digunakan untuk mengiterasi array dan mencari elemen pertama yang cocok
    const index = todoList.find((todo) => todo.id == id)
    const removed = todoList.splice(index, 1)
    _id(`todo-${id}`).remove();
    saveTodo()
    // console.log(removed) 
    // untuk debug mana yang dihapus
}

updateGallery()