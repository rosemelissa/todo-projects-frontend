import { useState } from "react";
import OneProjectDisplay from "./components/OneProjectDisplay";
import ProjectsSidebar from "./components/ProjectSidebar";

function App(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<number|null>(null);

  return (
    <>
      <ProjectsSidebar selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>
      {selectedProject && <OneProjectDisplay selectedProject={selectedProject}/>}
    </>
  );
}

export default App;
