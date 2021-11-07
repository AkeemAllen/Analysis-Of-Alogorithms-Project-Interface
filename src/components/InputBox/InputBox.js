import React, { useState } from "react";
import "./index.scss";
import axios from "axios";

const InputBox = ({ handleChange, courseModule, onClick }) => {
  return (
    <div className="input-box">
      <input
        className="input-box__input"
        placeholder="Module"
        onChange={handleChange}
        value={courseModule}
        id="input-box__input"
      />
      <button className="input-box__button" onClick={onClick}>
        Add Module
      </button>
    </div>
  );
};

export default InputBox;
