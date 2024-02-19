import React, { useState } from "react";
import "./../styles/login.css";
import { UserProfileForm } from "./../components/UserProfileForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../stores/userSlice";

export const Login = () => {
  const [loginState, setLoginState] = useState(true);
  // Form data and handlers
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Call login dispath function when the user logs in
    if (loginState) {
      const filledOut = email && password;
      if (!filledOut) {
        alert("Fill out form");
        return;
      }

      const reduxLogin = async () => {
        console.log("REDUX")
        dispatch(login({
          email: email,
          password: password,
        }));
        navigate("/home");
      }

      // API call
      const auth = async () => {
        try  {
          const userState = {
            email: email,
            password: password,
          }
          console.log(userState)
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Send form state
            body: JSON.stringify(userState),
          });
          console.log(response)

          if (!response.ok) throw new Error("Error logging in");

          // If good response redux login
          const data = await response.json();
          if (data.length !== 0) await reduxLogin();
        } catch (error) {
          console.error('Error loggining in:', error.message);
          alert("Error logging in make sure email and password are valid.");
          return false;
        }
      }
      auth();
    } else {
      const filledOut = email && password && username && firstName && lastName;
      if (!filledOut) {
        alert("Fill out form");
        return;
      }

      const signUp = async () => {
        // If user signs up call create user route
        try {
          const userState = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
          }
          console.log(userState)
          const response = await fetch("/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Send form state
            body: JSON.stringify(userState),
          });
      
          if (!response.ok) throw new Error("Error Signing Up");
          
          const newUser = await response.json();
          console.log("New user created:", newUser);

          // Send alert prompting user to now log in
          alert(`Thank you ${newUser.firstName} for signing up! Please login with your credentials now.`);
        } catch (error) {
          console.error('Error creating user:', error.message);
          alert("Error signing up please try again");
        }
      }
      signUp();
    }
  }

  return (
    <div className="login-box">
      <h1 className="login-heading">{loginState ? "Log In" : "Create Account"}</h1>
      <form className="login-form">
        <input 
          className="input-box" 
          type="email" 
          placeholder="Email" 
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {!loginState && // If in sign up state add UserProfileForm
          <UserProfileForm
            setUsername={setUsername}
            setFirstName={setFirstName} 
            setLastName={setLastName} 
          />
        }
        <input 
          className="input-box" 
          type="password" 
          placeholder="Password" 
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          className="submit-btn form-btn" 
          value={loginState ? "Log In" : "Create Account"}
          type="button"
          onClick={handleSubmit}
        />
        <input 
          className="toggle-state-btn form-btn" 
          type="button" 
          value={loginState ? "Or Create Account" : "Or Log In"} 
          onClick={() => setLoginState(!loginState)}
        />
      </form>
    </div>
  )
}