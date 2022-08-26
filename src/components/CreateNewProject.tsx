import axios from "axios";
import { useState } from "react";
import IProject from "../Interfaces/IProject";

interface CreateNewProjectProps {
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const baseUrl = process.env.NODE_ENV === "production"
	? "https://rosemelissa-todo-projects.herokuapp.com"
	: "http://localhost:4000"

function CreateNewProject({setProjects}: CreateNewProjectProps): JSX.Element {
    const [mode, setMode] = useState<string>('button');
    const [newProjectName, setNewProjectName] = useState<string>('');

    const handleCreateNewProject = async() => {
        await axios.post(`${baseUrl}/project`, {name: newProjectName});
        setNewProjectName('')
        setMode('button')
    }

    const handleCancel = () => {
        setNewProjectName('');
        setMode('button');
    }

    return(
        <div id="create-new-project">
            {(mode === 'button') && <button type="button" onClick={() => setMode('input')}>Create new project</button>}
            {(mode === 'input') &&
            <>
                <input type="text" placeholder="New project name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)}/>
                <button type="button" onClick={handleCreateNewProject}>Create</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </>
                
                }
        </div>
    )
}

export default CreateNewProject;