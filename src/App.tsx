import { useState } from "react";
import OneProjectDisplay from "./components/OneProjectDisplay";
import ProjectsSidebar from "./components/ProjectSidebar";
import IProject from "./Interfaces/IProject";

function App(): JSX.Element {
  const [projects, setProjects] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<number|null>(null);

  return (
    <>
      <ProjectsSidebar />
      {selectedProject && <OneProjectDisplay selectedProject={selectedProject}/>}
    </>
  );
}

export default App;
