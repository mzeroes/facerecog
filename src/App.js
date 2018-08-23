import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import FaceRecogition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';


const app = new Clarifai.App({
    apiKey: '23260d6c247a4382a37c957c7f4533b7'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'register',
            isSignedin: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then((res) => res.json())
            .then(console.log)
    }
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
        console.log(box);
    }


    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        if (this.state.input) {
            app.models
                .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
                .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
                .catch(err => console.log(err));
        }
    }
    onRouteChange = (route) => {
        this.setState({ route: route });
        if (route === 'Signin' || route === 'register')
            this.setState({ isSignedin: false });
        else {
            this.setState({ isSignedin: true });
        }

    }
    render() {
        return (
            <div className="App">
                <Navigation route={this.state.route} onRouteChange={this.onRouteChange} />
                <Logo />
                {(this.state.route === 'home')
                    ?
                    <div>
                        <Rank />
                        <ImageLinkForm onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecogition box={this.state.box} imageUrl={this.state.imageUrl} />
                    </div>
                    : (this.state.route === 'signin'
                        ? <Signin onRouteChange={this.onRouteChange} />
                        : <Register onRouteChange={this.onRouteChange} />
                    )

                }
            </div>
        );
    }
}

export default App;
