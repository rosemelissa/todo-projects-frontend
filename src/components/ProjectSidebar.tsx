import { useEffect, useState } from "react";
import IProject from "../Interfaces/IProject";
import OneProjectListing from "./OneProjectListing";

import axios from 'axios';

interface ProjectSidebarProps {
    selectedProject: number|null;
    setSelectedProject: React.Dispatch<React.SetStateAction<number | null>>
}

function ProjectsSidebar({selectedProject, setSelectedProject}: ProjectSidebarProps): JSX.Element {
    const [projects, setProjects] = useState<IProject[]>([])
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectArray: IProject[] = (await axios.get("https://rosemelissa-todo-projects.herokuapp.com/projects")).data;
                setProjects(projectArray);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProjects();
    }, [])

    return(
        <div className="projects-sidebar">
            <p>projects</p>
            {console.log(projects)}
            {projects ? projects.map(project => <OneProjectListing key={project.id} project={project} projects={projects} setProjects={setProjects}/>): <p>Loading...</p>}
        </div>
    );
}

export default ProjectsSidebar;