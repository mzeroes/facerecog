import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// import { url } from "../../config";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginEmail: "",
      LoginPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ LoginEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ LoginPassword: event.target.value });
  };

  onSubmitLogin = () => {
    // fetch(url.PUBLIC_URL + "/Login", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: this.state.LoginEmail,
    //     password: this.state.LoginPassword
    //   })
    // })
    //   .then(response => response.json())
    //   .then(user => {
    //     if (user.id) {
    //       this.props.loadUser(user);
    //       this.props.onRouteChange("home");
    //     }
    //   });

    if (
      this.state.LoginEmail === "user" &&
      this.state.LoginPassword === "pwd"
    ) {
      cookies.set("userToken", "MyFakeToken", { path: "/" });

      this.props.handleUserInfo({
        id: "001",
        name: "John Doe",
        email: "john@doe.com",
        entries: "3135",
        joined: "01/01/1995"
      });

      this.props.onRouteChange("home");
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-1 center">
        <main className="pa3">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-black w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitLogin}
                className="b ph3 pv2 input-reset ba b--black grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("signup")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Login;
