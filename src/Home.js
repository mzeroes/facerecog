import React from "react";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import { Keys } from "./Keys";
import { url } from "./config";
import "./Home.css";
const app = new Clarifai.App({
  apiKey: Keys.clarifyAPI
});

class Home extends React.Component {
  state = {
    input: "",
    imageUrl: "",
    errorState: "",
    box: {},
    user: this.props.user
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch(url + "/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => this.setState({ errorState: err }));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => this.setState({ errorState: err }));
  };
  render() {
    return (
      <div>
        <div className="Home">
          <div>{this.state.errorState}</div>
          <Logo className="Logo" />
          <Rank name={this.state.user} entries={this.state.user.entries} />
          <ImageLinkForm
            className="LinkForm"
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition
            box={this.state.box}
            imageUrl={this.state.imageUrl}
          />
        </div>
      </div>
    );
  }
}

export default Home;
