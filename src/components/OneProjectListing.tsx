import axios from "axios";
import IProject from "../Interfaces/IProject";

interface OneProjectListingProps {
    project: IProject;
    projects: IProject[];
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

function OneProjectListing({project, projects, setProjects}: OneProjectListingProps): JSX.Element {
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
            <p>{project.name}</p>
            <button type="button">Edit</button>
            <button type="button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default OneProjectListing;