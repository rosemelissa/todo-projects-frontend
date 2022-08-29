import ITodo from "../Interfaces/ITodo";

function filterTodos(
  todos: ITodo[],
  method: string,
  showOverdue: boolean
): ITodo[] {
  let sortedTodoList: ITodo[] = [...todos];
  if (method === "id") {
    sortedTodoList = sortedTodoList.sort(function (a, b) {
      const keyA = a.id;
      const keyB = b.id;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  } else if (method === "title") {
    sortedTodoList = sortedTodoList.sort(function (a, b) {
      const keyA = a.title.toLowerCase();
      const keyB = b.title.toLowerCase();
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  } else if (method === "dueDate") {
    sortedTodoList = sortedTodoList.sort(function (a, b) {
      const keyA = new Date(a.duedate);
      const keyB = new Date(b.duedate);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  } else if (method === "updatedDate") {
    sortedTodoList = sortedTodoList.sort(function (a, b) {
      const keyA = new Date(a.updateddate);
      const keyB = new Date(b.updateddate);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }
  if (!showOverdue) {
    sortedTodoList = sortedTodoList.filter(
      (todo) => Date.parse(todo.duedate) > Date.now()
    );
  }
  return sortedTodoList;
}

export default filterTodos;
