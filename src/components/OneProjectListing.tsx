import axios from "axios";
import { useState } from "react";
import IProject from "../Interfaces/IProject";
import { baseUrl } from "../utils/constants";

interface OneProjectListingProps {
  project: IProject;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  selectedProject: IProject | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
  refreshProjectsList: boolean;
  setRefreshProjectsList: React.Dispatch<React.SetStateAction<boolean>>;
}

function OneProjectListing({
  project,
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
  refreshProjectsList,
  setRefreshProjectsList,
}: OneProjectListingProps): JSX.Element {
  const [mode, setMode] = useState<"display" | "edit">("display");
  const [thisProjectName, setThisProjectName] = useState<string>(project.name);

  const handleSelect = () => {
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/project/${project.id}`);
      setRefreshProjectsList(!refreshProjectsList);
      setSelectedProject(null);
      //setProjects([...projects.filter(item => item.id !== project.id)])
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`${baseUrl}/project/${project.id}`, {
        name: thisProjectName,
      });
      setRefreshProjectsList(!refreshProjectsList);
    } catch (error) {
      console.error(error);
    }
    setMode("display");
  };

  return (
    <div className="one-project-listing">
      {mode === "display" && (
        <>
          <p className="project-name" onClick={handleSelect}>
            {project.name}
          </p>
          <p className="emoji" onClick={() => setMode("edit")}>
            📝
          </p>
          <p className="emoji" onClick={handleDelete}>
            🗑️
          </p>
        </>
      )}
      {mode === "edit" && (
        <>
          <input
            type="text"
            value={thisProjectName}
            onChange={(e) => setThisProjectName(e.target.value)}
          />
          <p className="emoji" onClick={handleSaveEdit}>
            💾
          </p>
          <p
            className="emoji"
            onClick={() => {
              setMode("display");
              setThisProjectName(project.name);
            }}
          >
            🚫
          </p>
        </>
      )}
    </div>
  );
}

export default OneProjectListing;
