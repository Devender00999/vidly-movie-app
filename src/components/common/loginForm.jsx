import React from "react";
import Input from "./input";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username").max(6).alphanum(),
    password: Joi.string().required().label("Password").min(8).max(32),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
    // console.log(this.schema.username._flags.label);
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
