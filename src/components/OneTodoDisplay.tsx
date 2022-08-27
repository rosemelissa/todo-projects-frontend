import axios from "axios";
import { useState } from "react";
import ITodo from "../Interfaces/ITodo";

interface OneTodoDisplayProps {
    todo: ITodo;
    refreshTodosList: boolean;
    setRefreshTodosList: React.Dispatch<React.SetStateAction<boolean>>;
}

const baseUrl = process.env.NODE_ENV === "production"
	? "https://rosemelissa-todo-projects.herokuapp.com"
	: "http://localhost:4000"

function OneTodoDisplay({todo, refreshTodosList, setRefreshTodosList}: OneTodoDisplayProps): JSX.Element {
    const [mode, setMode] = useState<"display"|"edit">("display");
    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/project/${todo.projectId}/todo/${todo.id}`);
            setRefreshTodosList(!refreshTodosList);
        } catch (error) {
            console.error(error);
        }

    }
    //GET todo from database
    return(
        <div className="one-todo-display">
            {mode === "display" && <>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>{todo.dueDate}</p>
                <button type="button" onClick={() => setMode("edit")}>Edit</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </>}
            {mode === "edit" && <>
            
            </>}
        </div>
    );
}

export default OneTodoDisplay;