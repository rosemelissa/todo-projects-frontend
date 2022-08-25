import axios from "axios";
import IProject from "../Interfaces/IProject";

interface OneProjectListingProps {
    project: IProject;
    projects: IProject[];
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
    setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

function OneProjectListing({project, projects, setProjects, setSelectedProject}: OneProjectListingProps): JSX.Element {
const handleSelect = () => {
    setSelectedProject(project);
}

const handleDelete = async () => {
    try {
        await axios.delete(`https://rosemelissa-todo-projects.herokuapp.com/project/${project.id}`)
        setProjects([...projects.filter(item => item.id !== project.id)])
    } catch (error) {
        console.error(error);
    }
}

    return(
        <div className="one-project-listing">
            <button type="button" onClick={handleSelect}>{project.name}</button>
            <button type="button">Edit</button>
            <button type="button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default OneProjectListing;