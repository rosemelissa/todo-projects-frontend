import { useState } from "react";
import OneProjectDisplay from "./components/OneProjectDisplay";
import ProjectsSidebar from "./components/ProjectSidebar";
import IProject from "./Interfaces/IProject";

function App(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  return (
    <>
      <ProjectsSidebar
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      {selectedProject && (
        <OneProjectDisplay selectedProject={selectedProject} />
      )}
    </>
  );
}

export default App;
