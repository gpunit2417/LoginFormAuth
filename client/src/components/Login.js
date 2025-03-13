import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "./firebase"; // Import Firebase auth instance
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // 🔹 Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error("Google login failed");

      console.log("Google Login Success:", result.user);
      localStorage.setItem("token", await result.user.getIdToken()); // Store token
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Google Sign-In failed. Try again.");
    }
  };

  // 🔹 Facebook Sign-In
  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error("Facebook login failed");

      console.log("Facebook Login Success:", result.user);
      localStorage.setItem("token", await result.user.getIdToken()); // Store token
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      setError("Facebook Sign-In failed. Try again.");
    }
  };

  //fetched the data of the user and matches the credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful
        localStorage.setItem("token", data.token);
        history.push("/"); // Redirect to dashboard after login
        window.location.reload();
      } else {
        // Login failed
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
      // alert("")
    }
  };
  return ( 
    <div
      className="card"
      style={{
        width: "70vw",
        display: "flex",
        flexDirection: "row",
        margin: "20px auto",
        backgroundColor: "#86c232",
        justifyContent: "center"
      }}
    >
      <div className="card" style={{ width: "40%", margin: '15px 0 15px 0' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfp2CrKeGoMuU5_vvyHhEV4ce8MbINGIv1QQ&s"/>
      </div>
      <div className="card" style={{ width: "40%", float: "right", margin: '15px 0 15px 0' }}>
        <h2 style={{ textAlign: "left", margin: "20px 0 20px 30px" }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
        <div
          style={{
            marginBottom: "20px",
            position: "relative",
            margin: "0 0 50px 0",
          }}
        >
          <label
            style={{
              position: "absolute",
              left: "40px",
              top: "-10px",
              background: "white",
              padding: "0 5px",
              zIndex: "1",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: ".5rem",
              width: "calc(100% - 45px)", // Adjusted to the combined width of first and last name
              paddingLeft: "10px",
              marginLeft: "10px",
              height: "7vh",
              borderColor: '#86c232'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px", position: "relative", margin: '0 0 50px 0' }}>
            <label
              style={{
                position: "absolute",
                left: "40px",
                top: "-10px",
                background: "white",
                padding: "0 5px",
                zIndex: "1",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderRadius: ".5rem",
                width: "calc(100% - 45px)",
                paddingLeft: "10px",
                marginLeft: "10px",
                height: "7vh",
                borderColor: '#86c232'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              margin: "0 14px 15px 30px",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: '#86c232',
              color: 'white', 
              justifyContent: 'center',
              borderColor: '#86c232', 
            }}
          >
            Sign In
          </button>
          </form>
          <div style={{width: '80%', margin: '20px 0 20px 55px'}}>
            <h5 style={{backgroundColor: 'lightgray', fontStyle: "italic", borderRadius: '0.3rem', fontWeight: '400'}}>or Connect with the social media</h5>
          </div>
          <div style={{ textAlign: "center" }}>
          <button
            style={{
              margin: "0 3px 10px 10px",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: 'white'
            }}
            onClick={handleFacebookSignIn}
          ><FaFacebook style={{margin: '0 4px 3px 0'}}/>
            Sign up with Facebook
          </button>
          <button
            style={{
              margin: "0 3px 10px 10px",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: 'white',
              width: '59%'
            }}
            onClick={handleGoogleSignIn}
          ><FcGoogle style={{margin: '0 4px 3px 0'}}/>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
