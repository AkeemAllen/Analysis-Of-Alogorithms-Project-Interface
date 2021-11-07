import React, { useState } from "react";
import "./index.scss";
import axios from "axios";

const ConnectionBox = ({
  moduleList,
  startNode,
  endNode,
  addConnection,
  setEndNode,
  setStartNode,
}) => {
  return (
    <div className="connection-box">
      <div className="connection-box__input-container">
        <select
          className="connection-box__input-container__input"
          placeholder="Module"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
        >
          <option value={""}>None</option>
          {moduleList.map((courseModule) => {
            return (
              <option value={courseModule} key={courseModule}>
                {courseModule}
              </option>
            );
          })}
        </select>
        <p>TO</p>
        <select
          className="connection-box__input-container__input"
          placeholder="Module"
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
        >
          <option value={""}>None</option>
          {moduleList.map((courseModule) => {
            return (
              <option value={courseModule} key={courseModule}>
                {courseModule}
              </option>
            );
          })}
        </select>
      </div>
      <button className="connection-box__button" onClick={addConnection}>
        Add Connection
      </button>
    </div>
  );
};

export default ConnectionBox;
