import { useEffect, useState } from "react";
import IProject from "../Interfaces/IProject";
import OneProjectListing from "./OneProjectListing";

import axios from "axios";
import CreateNewProject from "./CreateNewProject";

interface ProjectSidebarProps {
  selectedProject: IProject | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rosemelissa-todo-projects.herokuapp.com"
    : "http://localhost:4000";

function ProjectsSidebar({
  selectedProject,
  setSelectedProject,
}: ProjectSidebarProps): JSX.Element {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [refreshProjectsList, setRefreshProjectsList] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectArray: IProject[] = (
          await axios.get(`${baseUrl}/projects`)
        ).data;
        setProjects(projectArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [refreshProjectsList]);

  return (
    <div className="projects-sidebar">
      <p>projects</p>
      {projects ? (
        projects.map((project) => (
          <OneProjectListing
            key={project.id}
            project={project}
            projects={projects}
            setProjects={setProjects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            refreshProjectsList={refreshProjectsList}
            setRefreshProjectsList={setRefreshProjectsList}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <CreateNewProject
        refreshProjectsList={refreshProjectsList}
        setRefreshProjectsList={setRefreshProjectsList}
      />
    </div>
  );
}

export default ProjectsSidebar;
