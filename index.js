const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton')
const noTasks = document.getElementById('noTasks')

function changeUI() { //удаляет/добавляет сообщение, что список пуст и блокирует/активирует кнопку
    if (taskList.textContent === '') { //если список задач пуст
        clearButton.disabled = true; //кнопка заблокирована
        noTasks.style.display = 'block';//сообщение, что список пуст
    } else { //в противном случае сообщения нет и кнопка активна
        clearButton.disabled = false;
        noTasks.style.display = 'none'
    }
}

changeUI()

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];//берём массив под именем tasks, а если его нет, то создаём

addButton.addEventListener('click', function() { //при клике на кнопку добавить
    const taskText = taskInput.value;//берём текст из поля ввода
    
    if (taskText !== '') { //если текст присуствует
        const newTask = document.createElement('li');//создаём элемент списка
        const checkBox = document.createElement('input');//создаём инпут
        checkBox.setAttribute('type', 'checkbox');//определеяем тип инпута - чекбокс

        newTask.textContent = taskText;//текст из поля ввода присваиваем элементу списка
        tasks.push(taskText);//пушим в созданный массив
        localStorage.setItem('tasks', JSON.stringify(tasks));//сохраняем задание в локальную память
        
        newTask.appendChild(checkBox);//чекбокс прикрекпляем к созданной задаче
        taskList.append(newTask);//задачу закрепляем в листе
        taskInput.value = '';//очищаем поле ввода задачи

        setCheckBoxListeners();//изменяем состояние чекбоксов
        changeUI();//проверяем наличие задач для обновления интерфейса 
    } else {
        alert('Введите задачу!');
    }
});

function setCheckBoxListeners() {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');//берём все созданные инпуты
    
    checkBoxes.forEach((checkBox) => { //для каждого из чекбокса проверяем
        checkBox.addEventListener('change', function() {
            const taskItem = checkBox.parentElement; //берём родительский элемент каждого чекбокса(элемент списка li)
            if (checkBox.checked) { //если чекбокс отмечен
                taskItem.classList.add('completed');//то элемент зачеркивается, как "выполнено"
            } else {//в противном случае этого не происходит
                taskItem.classList.remove('completed');
            }
        });
    });
}

clearButton.addEventListener('click', function() {//очищаем список
    taskList.textContent = '';//убираем все существующие задачи
    changeUI();//обновляем интерфейс
})