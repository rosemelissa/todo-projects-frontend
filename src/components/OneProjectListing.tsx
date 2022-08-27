import axios from "axios";
import { useState } from "react";
import IProject from "../Interfaces/IProject";

interface OneProjectListingProps {
  project: IProject;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  selectedProject: IProject | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
  refreshProjectsList: boolean;
  setRefreshProjectsList: React.Dispatch<React.SetStateAction<boolean>>;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rosemelissa-todo-projects.herokuapp.com"
    : "http://localhost:4000";

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
          <button type="button" onClick={handleSelect}>
            {project.name}
          </button>
          <button type="button" onClick={() => setMode("edit")}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
      {mode === "edit" && (
        <>
          <input
            type="text"
            value={thisProjectName}
            onChange={(e) => setThisProjectName(e.target.value)}
          />
          <button type="button" onClick={handleSaveEdit}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("display");
              setThisProjectName(project.name);
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default OneProjectListing;
