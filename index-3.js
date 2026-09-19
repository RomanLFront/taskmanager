let tasks = [];
const completedTasks = [];
let completedTaskCount = 0;

const getTaskDescriptions = () => {
  return tasks.map((t) => t.description);
};

const getLongTasks = () => {
  return tasks.filter((t) => t.title.length > 10 || t.description.length > 10);
};

const getTasksByDateRange = (startDate, endDate, isCompleted = false) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isCompleted) {
    return tasks.filter(
      (t) =>
        t.createdDate >= start &&
        t.createdDate <= end &&
        t.completedDate &&
        t.completedDate <= end,
    );
  } else {
    return tasks.filter((t) => t.createdDate >= start && t.createdDate <= end);
  }
};

const clearShortTasks = () => {
  tasks = tasks.filter((t) => t.title.length >= 5);
};

const changeTask = (index, newTitle = '') => {
  if (index >= 0 && index < tasks.length) {
    tasks[index].title = newTitle;
    return;
  }
  console.log('Такой задачи не существует');
};

const showTasks = () => {
  if (!tasks.length) {
    console.log('Задачи отсутствуют');
    return;
  }

  tasks.forEach((task) =>
    console.log(`
      Задача: ${task.title}, 
      статус: ${task.isCompleted ? 'Выполнена' : 'Не выполнена'}, 
      описание: ${task.description},
      дата начала: ${task.createdDate},
      дата завершения: ${task.completedDate}
    `),
  );
};

const setTask = (title, description = '') => {
  if (!title) {
    console.log('Введите название задачи');
    return;
  }

  const task = {
    title,
    description,
    isCompleted: false,
    createdDate: new Date(),
    completedDate: null,
  };

  tasks.push(task);
};

const completeTask = (index) => {
  if (index < 0 || index >= tasks.length) {
    console.log('Такой задачи не существует');
    return;
  }

  const t = tasks[index];

  if (t.isCompleted) {
    return;
  }

  const updatedTask = {
    ...t,
    isCompleted: true,
    completedDate: new Date(),
  };

  tasks = tasks.map((t, count) => (count === index ? updatedTask : t));
  completedTasks.push(updatedTask);
  completedTaskCount += 1;
};

const clearTasks = () => {
  tasks = [];
};

setTask('Загрузить отчёт', 'прикрепить отчёт для проекта в Нетологию');
showTasks();
setTask('Почитать про Date', 'в курсе reactify прочитать модуль Date');
showTasks();
setTask('Читать', 'книга');
setTask('Чит', 'книга');
// setTimeout(() => completeTask(0), 1000)
// setTimeout(() => showTasks(), 2000)
completeTask(0);
console.log(completedTasks);
console.log(completedTaskCount);
showTasks();
// deleteTask(1)
// clearTasks()
// showTasks()
getTaskDescriptions();
getLongTasks();
clearShortTasks();
showTasks();
changeTask(0, 'Загрузка отчёта');
showTasks();
getTasksByDateRange('2026-09-09', '2026-09-10', true);
getTasksByDateRange('2026-09-09', '2026-09-10', false);
completeTask(0);
console.log(completedTasks);
completeTask(-1);
