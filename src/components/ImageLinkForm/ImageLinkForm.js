import React from "react";
import "./ImageLinkForm.css";

class ImageLinkForm extends React.Component {
  state = {
    error: ""
  };

  render() {
    const { onInputChange, onButtonSubmit } = this.props;
    return (
      <div className="form">
        <input
          style={{ margin: "20px" }}
          type="text"
          onChange={onInputChange}
        />
        <button onClick={onButtonSubmit}>Detect</button>
      </div>
    );
  }
}

export default ImageLinkForm;
