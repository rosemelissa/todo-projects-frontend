import { useEffect, useState } from "react";
import IProject from "../Interfaces/IProject";
import OneProjectListing from "./OneProjectListing";

import axios from "axios";
import CreateNewProject from "./CreateNewProject";
import { baseUrl } from "../utils/constants";

interface ProjectSidebarProps {
  selectedProject: IProject | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
  setServerAwake: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectsSidebar({
  selectedProject,
  setSelectedProject,
  setServerAwake,
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
        setServerAwake(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
    // eslint-disable-next-line
  }, [refreshProjectsList]);

  return (
    <div className="projects-sidebar">
      <h1>Projects</h1>
      <CreateNewProject
        refreshProjectsList={refreshProjectsList}
        setRefreshProjectsList={setRefreshProjectsList}
      />
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
    </div>
  );
}

export default ProjectsSidebar;
