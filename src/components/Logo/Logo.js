import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";
const Logo = () => {
  return (
    <div className="pa0">
      <Tilt
        className="Tilt"
        options={{ max: 45 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          {" "}
          <img
            style={{ paddingTop: "0px" }}
            src={brain}
            alt="brain icon"
          />{" "}
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
