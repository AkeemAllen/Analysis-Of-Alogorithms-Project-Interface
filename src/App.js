import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox/InputBox";
import ConnectionBox from "./components/ConnectionBox/ConnectionBox";
import axios from "axios";

function App() {
  const [courseModule, setCourseModule] = useState("");
  const [courseModuleList, setCourseModuleList] = useState([]);
  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");
  const [generatedGraphHtml, setGeneratedGraphHtml] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setCourseModule(e.target.value);
  };

  const addModuleToModuleList = () => {
    let newString = courseModule.replace(" ", "_");
    axios
      .post("http://127.0.0.1:5001/add-node", { node: newString })
      .then((res) => {
        console.log(res);
        setCourseModule("");
        setCourseModuleList([...courseModuleList, courseModule]);
        generateGraph();
      })
      .catch((err) => console.log(err));
  };

  const generateGraph = () => {
    axios.get("http://127.0.0.1:5001/generate-graph").then((res) => {
      setGeneratedGraphHtml(res.data);
    });
  };

  const addConnection = () => {
    let newStartNode = startNode.replace(" ", "_");
    let newEndNode = endNode.replace(" ", "_");
    axios
      .post("http://127.0.0.1:5001/add-edge", {
        connection: { from: newStartNode, to: newEndNode },
      })
      .then(() => {
        setEndNode("");
        setStartNode("");
        generateGraph();
      });
  };

  return (
    <div className="App">
      <div className="Container">
        <div className="Inputs">
          <InputBox
            handleChange={handleChange}
            courseModule={courseModule}
            onClick={addModuleToModuleList}
          />
          <ConnectionBox
            moduleList={courseModuleList}
            generateGraph={generateGraph}
            startNode={startNode}
            endNode={endNode}
            addConnection={addConnection}
            setEndNode={setEndNode}
            setStartNode={setStartNode}
          />
        </div>
        <iframe className="iframe" srcDoc={generatedGraphHtml}></iframe>
      </div>
    </div>
  );
}

export default App;
