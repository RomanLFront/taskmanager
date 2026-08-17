const readline = require('readline/promises')
const { stdin: input, stdout: output } = require('process')


let tasks = []
const completedTasks = []
let completedTaskCount = 0

const showTasks = () => {
  if (!tasks.length) {
    console.log('Задачи отсутствуют')
    return;
  }
  
  tasks.forEach((task) => 
    console.log(`
      Задача: ${task.title}, 
      статус: ${task.isCompleted ? 'Выполнена' : 'Не выполнена'}, 
      описание: ${task.description},
      дата начала: ${task.createdDate},
      дата завершения: ${task.completedDate}
    `)
  )
}

const setTask = (title, description = '') => {
  if (!title) {
    console.log('Введите название задачи')
    return;
  }

  const task = {
    title,
    description,
    isCompleted: false,
    createdDate: new Date(),
    completedDate: null
  }

  tasks.push(task)
}

const completeTask = (index) => {
  if (0 <= index  && index < tasks.length) {
    tasks[index].isCompleted = true
    tasks[index].completedDate = new Date()
    completedTasks.push(tasks[index])
    completedTaskCount += 1
    return;
  }

  console.log('Такой задачи не существует')
}

const deleteTask = async (index) => {
  if (index > tasks.length - 1 || index < 0) {
    console.log('Такой задачи не существует')
    return;
  }

  if (tasks[index].isCompleted === false) {
    const rl = readline.createInterface({ input, output })
    console.log('Таска ещё не выполнена, удалить?')
    const answer = await rl.question('Ответ: ')
    if (answer === 'удалить') {
      tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1, tasks.length)]
      rl.close()
      showTasks()
      return
    }
     
    if (answer === 'пропустить') {
      rl.close()
      showTasks()
      return;
    }

    rl.close()
    return;
  }

  tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1, tasks.length)]
}

const clearTasks = () => {
  tasks = []
}

setTask('Загрузить отчёт', 'прикрепить отчёт для проекта в Нетологию')
showTasks()
setTask('Почитать про Date', 'в курсе reactify прочитать модуль Date')
showTasks()
// setTimeout(() => completeTask(0), 1000)
// setTimeout(() => showTasks(), 2000)
completeTask(0)
console.log(completedTasks)
console.log(completedTaskCount)
showTasks()
// deleteTask(1)
// clearTasks()
// showTasks()