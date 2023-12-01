import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";

function Login() {
  const [signup, setSignup] = useState(false);
  const [loginError, setLoginError] = useState(null); // State to store login error

  const { setIsLoggedIn, setUser } = useOutletContext();

  function handleClick() {
    setSignup(!signup);
  }

  // Login validation, formik, and form
  const loginSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then((r) => {
        if (r.ok) {
          return r.json().then((user) => {
            setIsLoggedIn(true);
            setUser(user);
          });
        } else {
          setLoginError("Invalid login credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setLoginError("Invalid login credentials. Please try again.");
      });
    },
  });

  const loginForm = () => {
    return (
      <>
        <h1 className="logintitle">User Login</h1>

        <form onSubmit={loginFormik.handleSubmit} className="login-form">
          <label htmlFor="username">Enter User Name:</label>
          <input
            type="text"
            name="username"
            value={loginFormik.values.username}
            onChange={loginFormik.handleChange}
          />
          <button id="loginsubmitbutton" type="submit">
            Log In
          </button>
          <button id="loginsignupbutton" onClick={handleClick}>
            Sign Up
          </button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </>
    );
  };

  // Signup validation, form, and formik
  const signupSchema = yup.object().shape({
    firstName: yup.string().required("Must enter a first name").max(15),
    lastName: yup.string().required("Must enter a last name").max(15),
    username: yup.string().required("Must enter a username").max(15),
    email: yup.string().email("Invalid email"),
  });

  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      fetch("http://localhost:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setIsLoggedIn(user);
            setUser(user);
          });
        }
      });
    },
  });

  const signupForm = () => {
    return (
      <>
        <h1>Signup</h1>
        <form onSubmit={signupFormik.handleSubmit}>
          <label htmlFor="firstName">Enter First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={signupFormik.values.firstName}
            onChange={signupFormik.handleChange}
          />
          <p style={{ color: "red" }}>{signupFormik.errors.firstName}</p>

          <label htmlFor="lastName">Enter Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={signupFormik.values.lastName}
            onChange={signupFormik.handleChange}
          />
          <p style={{ color: "red" }}>{signupFormik.errors.lastName}</p>

          <label htmlFor="username">Enter User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={signupFormik.values.username}
            onChange={signupFormik.handleChange}
          />
          <p style={{ color: "red" }}>{signupFormik.errors.username}</p>

          <label htmlFor="email">Enter Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupFormik.values.email}
            onChange={signupFormik.handleChange}
          />
          <p style={{ color: "red" }}>{signupFormik.errors.email}</p>

          <button type="submit">Submit</button>
        </form>
        <button onClick={handleClick}>Go To Login</button>
      </>
    );
  };

  return <div>{signup ? signupForm() : loginForm()}</div>;
}

export default Login;
