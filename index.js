let task = ''
let completedTaskCount = 0

const showTask = () => {
  if (!task) {
    console.log('Задача отсутствует')
    return;
  }
  
  console.log(task)
}

const setTask = (taskDescription) => {
  if (task) {
    console.log('Не могу добавить задачу, завершите или удалите предыдущую')
    return;
  }

  task = taskDescription
}

const completeTask = () => {
  if (task) {
    task = ''
    completedTaskCount += 1
    return;
  }

  console.log('Нет не выполненных задач')
}

const deleteTask = () => {
  if (task) {
    task = ''
    return;
  }

  console.log('Нет задач')
}

setTask('Сделать практику по js')
showTask()
completeTask()
console.log(task, completedTaskCount)
deleteTask()
completeTask()
setTask('Сделать практику по ts')
setTask('Сделать практику по react')
console.log(task)
deleteTask()
console.log(task, completedTaskCount)