import axios from "axios";
import IProject from "../Interfaces/IProject";

interface OneProjectListingProps {
    project: IProject;
    projects: IProject[];
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
    setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

const baseUrl = process.env.NODE_ENV === "production"
	? "https://rosemelissa-todo-projects.herokuapp.com"
	: "http://localhost:4000"

function OneProjectListing({project, projects, setProjects, setSelectedProject}: OneProjectListingProps): JSX.Element {
const handleSelect = () => {
    setSelectedProject(project);
}

const handleDelete = async () => {
    try {
        await axios.delete(`${baseUrl}/project/${project.id}`)
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