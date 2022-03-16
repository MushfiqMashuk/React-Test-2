import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import validateEmail from "../utilities/validateEmail";
import Button from "./Button";

/**
 * Login Component
 *
 * @returns {object} - Returns a JSX element
 */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  /**
   * Handles controlled input values
   *
   * @param {object} e - Accepts the event
   */

  const handleChange = (e) => {
    const target = e.target;
    if (target.name === "email") {
      setEmail(target.value);
    } else setPassword(target.value);
  };

  const handleSubmit = async () => {
    if (validateEmail(email) && password.length > 1) {
      // Creating body for POST request
      const bodyData = {
        email,
        password,
      };

      setLoading(true);
      postData("http://51.195.148.112/api/admin/auth/login", bodyData);
    } else {
      setError("Email or Password is incorrect!");
    }
  };

  /**
   *
   * @param {string} url
   * @param {object} bodyData
   */

  async function postData(url, bodyData) {
    axios({
      method: "post",
      url,
      data: bodyData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        setError("");
        // set cookie

        console.log(response.data.token);
        document.cookie = `autonomyBdUser=${response.data.token}`;
        navigate("/products");
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to Login!");
      });
  }

  return (
    <div className={styles.form}>
      <h3 style={{ fontWeight: 300, fontSize: "35px", color: "gray" }}>
        Login
      </h3>

      <input
        className={styles.input}
        type="text"
        placeholder="Email Address"
        value={email}
        name="email"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        className={styles.input}
        style={{ marginTop: "5px" }}
        type="text"
        placeholder="Password"
        value={password}
        name="password"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        className={styles.button}
        onClick={handleSubmit}
        style={{ marginBottom: "10px" }}
        disabled={loading}
      >
        Log in
      </Button>
    </div>
  );
}

export default Login;
