import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import OneProjectDisplay from "./components/OneProjectDisplay";
import ProjectsSidebar from "./components/ProjectSidebar";
import IProject from "./Interfaces/IProject";

function App(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [serverAwake, setServerAwake] = useState<boolean>(false);

  return (
    <div id="app">
      {!serverAwake && <LoadingScreen />}
      <ProjectsSidebar
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        setServerAwake={setServerAwake}
      />

      <OneProjectDisplay selectedProject={selectedProject} />
    </div>
  );
}

export default App;
