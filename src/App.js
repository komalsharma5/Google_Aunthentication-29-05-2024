import React, { Component } from "react";
import Login from "./Components/Login";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase";
import Register from "./Components/Register";

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

class App extends Component {
  constructor() {
    super();

    this.state = {
      pageChange: false,
      errMessage: "",
    };
  }
  pageChangeHandler = (e) => {
    // alert("hjgkg");
    e.preventDefault();
    this.setState({
      pageChange: !this.state.pageChange,
    });
  };

  registerSubmitHandler = (e) => {
    e.preventDefault();
    // alert("jhuh");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    console.log(email, password, repassword);

    if (password === repassword) {
      this.setState({
        pageChange: true,
      });
    } else {
      this.setState({
        errMessage: "Password doesn't match...",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  googleHandler = (e) => {
    e.preventDefault();
    // alert("jhgier");
    signInWithPopup(auth,provider).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    }
    )
  }

  render() {
    return (
      <>
        {this.state.pageChange === false ? (
          <Register
            pageChange={this.pageChangeHandler}
            submit={this.registerSubmitHandler}
            errMessage={this.state.errMessage}
            googleHandler={this.googleHandler}
          ></Register>
        ) : (
          <Login pageChange={this.pageChangeHandler}></Login>
        )}
      </>
    );
  }
}

export default App;
