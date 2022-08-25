import { useState } from "react";
import IProject from "../Interfaces/IProject";
import OneTodoDisplay from "./OneTodoDisplay";

interface OneProjectDisplayProps {
    selectedProject: IProject|null;
}

function OneProjectDisplay({selectedProject}: OneProjectDisplayProps): JSX.Element {
    //GET that project name by id
    //GET that projects todo list ids by projectid
    const [todoIds, setTodoIds] = useState<number[]>([1, 2, 3]);
    if (selectedProject) {
        return (
                <div className="one-project-display">
                    <h1>{selectedProject.name}</h1>
                    {todoIds.map(todoId => <OneTodoDisplay key={todoId} todoId={todoId}/>)}
                </div>
            )
    } else {
        return(
            <>
                <h1>No project selected!</h1>
                <p>Click on a project in the side-bar to view the todos, or click 'create new project'!</p>
            </>
        )
    }
    
}

export default OneProjectDisplay;