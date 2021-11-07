import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox/InputBox";
import ConnectionBox from "./components/ConnectionBox/ConnectionBox";
import axios from "axios";
import ModuleBox from "./components/ModuleBox/ModuleBox";

function App() {
  const [courseModule, setCourseModule] = useState("");
  const [courseModuleList, setCourseModuleList] = useState([]);
  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");
  const [generatedGraphHtml, setGeneratedGraphHtml] = useState("");
  const [optimalOrder, setOptimalOrder] = useState([]);

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
        generateOptimalOrder();
      })
      .catch((err) => console.log(err));
  };

  const generateGraph = () => {
    axios.get("http://127.0.0.1:5001/generate-graph").then((res) => {
      setGeneratedGraphHtml(res.data);
    });
  };

  const generateOptimalOrder = () => {
    axios.get("http://127.0.0.1:5001/generate-optimal-order").then((res) => {
      setOptimalOrder(res.data);
      console.log(res);
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
        generateOptimalOrder();
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
        <div className="optimal-order">
          <h3 style={{ textAlign: "center" }}>Optimal Order To Do Modules</h3>
          <div className="optimal-order-modules">
            {optimalOrder.map((module_, index) => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ModuleBox key={index} text={module_} /> -{">"}
                </div>
              );
            })}
          </div>
        </div>
        <div className="iframe-container">
          <iframe
            className="iframe"
            srcDoc={generatedGraphHtml}
            title="graph"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
