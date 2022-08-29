import axios from "axios";
import { useState } from "react";
import ITodo from "../Interfaces/ITodo";
import ITodoInput from "../Interfaces/ITodoInput";
import formatDate from "../utils/formatDate";

interface OneTodoDisplayProps {
  todo: ITodo;
  refreshTodosList: boolean;
  setRefreshTodosList: React.Dispatch<React.SetStateAction<boolean>>;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rosemelissa-todo-projects.herokuapp.com"
    : "http://localhost:4000";

function OneTodoDisplay({
  todo,
  refreshTodosList,
  setRefreshTodosList,
}: OneTodoDisplayProps): JSX.Element {
  const [mode, setMode] = useState<"display" | "edit">("display");
  const [editedTodo, setEditedTodo] = useState<ITodoInput>({ title: todo.title, description: todo.description, duedate: todo.duedate })

  const handleDelete = async () => {
    try {
      console.log(todo);
      await axios.delete(
        `${baseUrl}/project/${todo.projectid}/todo/${todo.id}`
      );
      setRefreshTodosList(!refreshTodosList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`${baseUrl}/project/${todo.projectid}/todo/${todo.id}`, editedTodo);
      setRefreshTodosList(!refreshTodosList);
      setMode("display");
    } catch (error) {
      console.error(error);
    }
  }

  const handleCancel = () => {
    setEditedTodo({ title: todo.title, description: todo.description, duedate: todo.duedate });
    setMode("display");
  }


  //GET todo from database
  return (
    <div className="one-todo-display">
      {mode === "display" && (
        <>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>{formatDate(todo.duedate)}</p>
          {console.log(todo.duedate, todo.title)}
          <button type="button" onClick={() => setMode("edit")}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
      {mode === "edit" && <>
      <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={editedTodo.title}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, title: e.target.value });
            }}
          />
          <label htmlFor="descrption">Description</label>
          <input
            type="text"
            id="description"
            value={editedTodo.description}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, description: e.target.value });
            }}
          />
          <label htmlFor="due-date">Due date</label>
          <input
            type="date"
            id="due-date"
            value={editedTodo.duedate}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, duedate: e.target.value });
            }}
          />
          <button type="button" onClick={handleSaveEdit}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </>}
    </div>
  );
}

export default OneTodoDisplay;
