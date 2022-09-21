import axios from "axios";
import { useState } from "react";
import ITodo from "../Interfaces/ITodo";
import ITodoInput from "../Interfaces/ITodoInput";
import { baseUrl } from "../utils/constants";
import formatDate from "../utils/formatDate";

interface OneTodoDisplayProps {
  todo: ITodo;
  refreshTodosList: boolean;
  setRefreshTodosList: React.Dispatch<React.SetStateAction<boolean>>;
}

function OneTodoDisplay({
  todo,
  refreshTodosList,
  setRefreshTodosList,
}: OneTodoDisplayProps): JSX.Element {
  const [mode, setMode] = useState<"display" | "edit">("display");
  const [editedTodo, setEditedTodo] = useState<ITodoInput>({
    title: todo.title,
    description: todo.description,
    duedate: todo.duedate,
  });

  const handleMakeIncomplete = async () => {
    try {
      await axios.patch(
        `${baseUrl}/project/${todo.projectid}/todo/${todo.id}/completion`,
        { complete: false }
      );
      setRefreshTodosList(!refreshTodosList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeComplete = async () => {
    try {
      await axios.patch(
        `${baseUrl}/project/${todo.projectid}/todo/${todo.id}/completion`,
        { complete: true }
      );
      setRefreshTodosList(!refreshTodosList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
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
      await axios.patch(
        `${baseUrl}/project/${todo.projectid}/todo/${todo.id}`,
        editedTodo
      );
      setRefreshTodosList(!refreshTodosList);
      setMode("display");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditedTodo({
      title: todo.title,
      description: todo.description,
      duedate: todo.duedate,
    });
    setMode("display");
  };

  return (
    <div className="one-todo-display">
      {mode === "display" && (
        <>
          {todo.complete && (
            <h2 className="todo-title complete">{todo.title}</h2>
          )}
          {!todo.complete && Date.parse(todo.duedate) > Date.now() && (
            <h2 className="todo-title incomplete underdue">{todo.title}</h2>
          )}
          {!todo.complete && Date.parse(todo.duedate) < Date.now() && (
            <h2 className="todo-title incomplete overdue">{todo.title}</h2>
          )}
          <p className="todo-description">{todo.description}</p>
          <p className="todo-duedate">Due: {formatDate(todo.duedate)}</p>
          <p>
            Completed:
            {todo.complete ? (
              <input
                type="checkbox"
                defaultChecked
                onClick={handleMakeIncomplete}
              />
            ) : (
              <input type="checkbox" onClick={handleMakeComplete} />
            )}
          </p>
          <p className="edit-and-delete">
            <span onClick={() => setMode("edit")}>📝</span>
            <span onClick={handleDelete}>🗑️</span>
          </p>
        </>
      )}
      {mode === "edit" && (
        <>
          <form className="editing-todo">
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
            <p className="save-and-cancel">
              <span onClick={handleSaveEdit}>💾</span>
              <span onClick={handleCancel}>🚫</span>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default OneTodoDisplay;
