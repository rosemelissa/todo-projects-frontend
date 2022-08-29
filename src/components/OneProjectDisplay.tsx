import axios from "axios";
import { useEffect, useState } from "react";
import IFilter from "../Interfaces/IFilter";
import IProject from "../Interfaces/IProject";
import ITodo from "../Interfaces/ITodo";
import CreateNewTodo from "./CreateNewTodo";
import Filter from "./Filter";
import OneTodoDisplay from "./OneTodoDisplay";
import filterTodos from "../utils/filterTodos"

interface OneProjectDisplayProps {
  selectedProject: IProject | null;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rosemelissa-todo-projects.herokuapp.com"
    : "http://localhost:4000";

function OneProjectDisplay({
  selectedProject,
}: OneProjectDisplayProps): JSX.Element {
  //GET that project name by id
  //GET that projects todo list ids by projectid
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [refreshTodosList, setRefreshTodosList] = useState<boolean>(true);
  const [filterMethod, setFilterMethod] = useState<IFilter>({method: "id", showOverdue: true})

  useEffect(() => {
    const fetchTodos = async () => {
      if (selectedProject) {
        try {
          const todosArray: ITodo[] = (
            await axios.get(`${baseUrl}/project/${selectedProject.id}/todos`)
          ).data;
          const filteredTodos: ITodo[] = filterTodos(todosArray, filterMethod.method, filterMethod.showOverdue);
          setTodos(filteredTodos);
        } catch (error) {
          console.error(error);
        }
      } else {
        setTodos([]);
      }
    };
    fetchTodos();
  }, [selectedProject, refreshTodosList, filterMethod]);

  if (selectedProject) {
    return (
      <div className="one-project-display">
        <h1 id="project-name">{selectedProject.name}</h1>
        <Filter filterMethod={filterMethod} setFilterMethod={setFilterMethod}/>
        <CreateNewTodo
          selectedProject={selectedProject}
          refreshTodosList={refreshTodosList}
          setRefreshTodosList={setRefreshTodosList}
        />
        {todos.map((todo) => (
          <OneTodoDisplay
            key={todo.id}
            todo={todo}
            refreshTodosList={refreshTodosList}
            setRefreshTodosList={setRefreshTodosList}
          />
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h1>No project selected!</h1>
        <p>
          Click on a project in the side-bar to view the todos, or click 'create
          new project'!
        </p>
      </>
    );
  }
}

export default OneProjectDisplay;
