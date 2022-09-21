import axios from "axios";
import { useState } from "react";
import IProject from "../Interfaces/IProject";
import ITodoInput from "../Interfaces/ITodoInput";
import { baseUrl } from "../utils/constants";

interface CreateNewTodoProps {
  selectedProject: IProject | null;
  refreshTodosList: boolean;
  setRefreshTodosList: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateNewTodo({
  selectedProject,
  refreshTodosList,
  setRefreshTodosList,
}: CreateNewTodoProps): JSX.Element {
  const [mode, setMode] = useState<"button" | "input">("button");
  const [newTodo, setNewTodo] = useState<ITodoInput>({
    title: "",
    description: "",
    duedate: new Date().toISOString(),
  });

  const handleNewTodo = async () => {
    if (selectedProject) {
      await axios.post(
        `${baseUrl}/project/${selectedProject.id}/todos`,
        newTodo
      );
      setMode("button");
      setNewTodo({
        title: "",
        description: "",
        duedate: new Date().toISOString(),
      });
      setRefreshTodosList(!refreshTodosList);
    }
  };

  const handleCancel = () => {
    setMode("button");
    setNewTodo({ title: "", description: "", duedate: "" });
  };

  return (
    <div id="create-new-todo">
      {mode === "button" && (
        <>
          <button type="button" onClick={() => setMode("input")}>
            Create New Todo
          </button>
        </>
      )}
      {mode === "input" && (
        <form>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            value={newTodo.title}
            onChange={(e) => {
              setNewTodo({ ...newTodo, title: e.target.value });
            }}
          />
          <label htmlFor="descrption"> Description </label>
          <input
            type="text"
            id="description"
            value={newTodo.description}
            onChange={(e) => {
              setNewTodo({ ...newTodo, description: e.target.value });
            }}
          />
          <label htmlFor="due-date"> Due date </label>
          <input
            type="date"
            id="due-date"
            value={newTodo.duedate}
            onChange={(e) => {
              setNewTodo({ ...newTodo, duedate: e.target.value });
            }}
          />
          <button type="button" onClick={handleNewTodo}>
            Create
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateNewTodo;
