import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h3 className="auth__title">Log in</h3>
          <div className="auth__input">
            <input
              required
              className="auth__text"
              type="text"
              name="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth__input">
            <input
              required
              className="auth__text"
              type="text"
              name="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth__wrapper">
            <button className="auth__button" type="submit">
              Log in
            </button>
            <p className="auth__link-text">
              Not a member yet?{" "}
              <Link className="auth__link" to="/signup"></Link>
              Sign up here
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     if (!this.state.username || !this.state.password) {
//       return;
//     }
//     auth
//       .authorize(this.state.username, this.state.password)
//       .then((data) => {
//         if (data.jwt) {
//           this.setState({ email: "", password: "" }, () => {
//             this.props.handleLogin(data.user.en_cal_goal.calGoal);
//             this.props.history.push("/diary");
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   render() {
//     return (
//       <div className="login">
//         <p className="login__welcome">Welcome back!</p>
//         <form onSubmit={this.handleSubmit} className="login__form">
//           <label htmlFor="username">Username:</label>
//           <input
//             required
//             id="username"
//             name="username"
//             type="text"
//             value={this.state.username}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="password">Password:</label>
//           <input
//             required
//             id="password"
//             name="password"
//             type="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//           <div className="login__button-container">
//             <button
//               type="submit"
//               onSubmit={this.handleSubmit}
//               className="login__link"
//             >
//               Log in
//             </button>
//           </div>
//         </form>

//         <div className="login__signup">
//           <p>Ready to begin your journey?</p>
//           <Link to="/register" className="signup__link">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }
