import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import Swal from "sweetalert2";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  useEffect(() => {
    if (msgError) {
      Swal.fire("Error", msgError, "error").then(() => {
        dispatch(removeError());
      });
    }
  }, [msgError, dispatch]);

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    }

    if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );

      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="auth__input"
          name="name"
          placeholder="Name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          className="auth__input"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="auth__input"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="auth__input"
          name="password2"
          placeholder="Confirm password"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn-block mb-5 btn btn-primary">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </div>
  );
};

// LEARN: CTRL + P
