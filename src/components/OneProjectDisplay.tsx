import { useState } from "react";
import OneTodoDisplay from "./OneTodoDisplay";

interface OneProjectDisplayProps {
    selectedProject: number;
}

function OneProjectDisplay({selectedProject}: OneProjectDisplayProps): JSX.Element {
    //GET that project name by id
    //GET that projects todo list ids by projectid
    const [todoIds, setTodoIds] = useState<number[]>([1, 2, 3]);

    return (
        <div className="one-project-display">
            {todoIds.map(todoId => <OneTodoDisplay key={todoId} todoId={todoId}/>)}
        </div>
    );
}

export default OneProjectDisplay;