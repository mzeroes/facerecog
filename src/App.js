import React from "react";
import Login from "./components/Signin/Signin";
import SignUp from "./components/Register/Register";
import Home from "./Home";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends React.Component {
  constructor() {
    super();

    let login = false;
    const cookieToken = cookies.get("userToken");
    if (cookieToken === "MyFakeToken") {
      login = true;
    }
    this.state = {
      route: "login",
      loggedInStatus: login,
      UserInfo: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }
  componentDidMount() {
    if (this.state.loggedInStatus) {
      this.setState({ route: "home" });
    }
  }
  /*
  Available routes
  home
  login
  logout
  signup
  */
  handleUserInfo = info => {
    this.setState({
      UserInfo: {
        id: info.id,
        name: info.name,
        email: info.email,
        entries: info.entries,
        joined: info.joined
      }
    });
  };
  onRouteChange = route => {
    if (route === "logout") {
      cookies.remove("userToken");
      this.setState({ route: "login", loggedInStatus: false });
    } else if (route === "home")
      this.setState({ loggedInStatus: true, route: route });
    else this.setState({ route: route });
  };

  container = () => {
    switch (this.state.route) {
      case "home":
        return (
          <Home
            user={this.state.UserInfo}
            onRouteChange={this.onRouteChange.bind(this)}
          />
        );
      case "login":
        return (
          <Login
            onRouteChange={this.onRouteChange.bind(this)}
            handleUserInfo={this.handleUserInfo.bind(this)}
          />
        );
      case "signup":
        return <SignUp onRouteChange={this.onRouteChange.bind(this)} />;
      default:
        return <div>404 invalid route</div>;
    }
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* For Debugging  */}
        <h3>{JSON.stringify(this.state)}</h3>
        {this.state.loggedInStatus ? (
          <div style={{ alignItems: "center" }}>
            <button onClick={() => this.onRouteChange("logout")}>logout</button>
          </div>
        ) : (
          ""
        )}
        {this.container()}
      </div>
    );
  }
}

export default App;
