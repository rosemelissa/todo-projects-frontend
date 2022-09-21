import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../utils/constants";

interface CreateNewProjectProps {
  refreshProjectsList: boolean;
  setRefreshProjectsList: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateNewProject({
  refreshProjectsList,
  setRefreshProjectsList,
}: CreateNewProjectProps): JSX.Element {
  const [mode, setMode] = useState<"button" | "input">("button");
  const [newProjectName, setNewProjectName] = useState<string>("");

  const handleCreateNewProject = async () => {
    await axios.post(`${baseUrl}/project`, { name: newProjectName });
    setNewProjectName("");
    setMode("button");
    setRefreshProjectsList(!refreshProjectsList);
  };

  const handleCancel = () => {
    setNewProjectName("");
    setMode("button");
  };

  return (
    <div id="create-new-project">
      {mode === "button" && (
        <p onClick={() => setMode("input")}>Create new project</p>
      )}
      {mode === "input" && (
        <>
          <input
            type="text"
            placeholder="New project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button type="button" onClick={handleCreateNewProject}>
            Create
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default CreateNewProject;
