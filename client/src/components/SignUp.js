import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "./firebase"; // Import Firebase

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log(result.user);
      alert(`Signed in as ${result.user.displayName}`);

      // Send user data to backend
    await fetch("http://localhost:4000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      }),
    });
    } catch (error) {
      console.error("Google Sign In Error", error);
      alert("Google Sign In failed");
    }
  };
 
  // Facebook Sign In
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
      alert(`Signed in as ${result.user.displayName}`);

      // Send user data to backend
    await fetch("http://localhost:4000/auth/facebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      }),
    });
    } catch (error) {
      console.error("Facebook Sign In Error", error);
      alert("Facebook Sign In failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
    }

    if (lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form data
      try {
        const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          alert('Registration successful');
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        alert('Registration failed: Network error');
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "85vw",
        display: "flex",
        flexDirection: "row",
        margin: "20px auto",
        backgroundColor: "#8860d0",
      }}
    >
      <div className="card" style={{ width: "40%", margin: "15px 0 15px 15px" }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFgPbj-Rd2mpL3LGAqZfaiXAy0jOMtXN9gIw&s" alt="logo"/>
      </div>
      <div
        style={{
          width: "60%",
          backgroundColor: "white",
          margin: "15px 20px 15px 0",
          borderRadius: "0.3rem",
          padding: "20px", // Added padding for better spacing
          float: "right",
        }}
      >
        <h1>Sign up</h1>
        <h4 style={{ textAlign: "left", margin: "15px 0 30px 30px" }}>Create Account</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <div
              style={{ flex: 1, position: "relative", margin: "0 0 15px 0" }}
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
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  borderRadius: ".5rem",
                  width: "90%",
                  height: "7vh",
                  margin: "0 0 2px 25px",
                  borderColor: '#8860d0'
                }}
                required
              />
              {errors.firstName && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "90%",
                    left: "25px",
                  }}
                >
                  {errors.firstName}
                </div>
              )}
            </div>
            <div
              style={{ flex: 1, position: "relative", margin: "0 0 15px 0" }}
            >
              <label
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "-10px",
                  background: "white",
                  padding: "0 5px",
                  zIndex: "1",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  borderRadius: ".5rem",
                  width: "90%",
                  height: "7vh",
                  paddingLeft: "10px",
                  borderColor: '#8860d0'
                }}
                required
              />
              {errors.lastName && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "90%",
                    left: "15px",
                  }}
                >
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginBottom: "20px",
              position: "relative",
              margin: "0 0 35px 0",
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
                borderColor: '#8860d0'
              }}
              required
            />
            {errors.email && (
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  top: "100%",
                  left: "30px",
                }}
              >
                {errors.email}
              </div>
            )}
          </div>
          <div
            style={{
              marginBottom: "20px",
              position: "relative",
              margin: "0 0 35px 0",
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
                borderColor: '#8860d0'
              }}
              required
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
              position: "relative",
              margin: "0 0 25px 0",
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                borderRadius: ".5rem",
                width: "calc(100% - 45px)",
                paddingLeft: "10px",
                marginLeft: "10px",
                height: "7vh",
                borderColor: '#8860d0'
              }}
              required
            />
            {errors.password && (
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  top: "100%",
                  left: "30px",
                }}
              >
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              margin: "0 10px 8px 10px",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: "#8660d0",
              color: "white",
              borderColor: '#8860d0'
            }}
          >
            Create Account
          </button>
        </form>
        <div style={{ display: "inline" }}>
          <p style={{ margin: "0 10px 0 10px" }}>Already have an account?
          <a style={{ color: "#8860d0" }} href="/login">
            Login
          </a></p>
        </div>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          <hr
            style={{ color: "black", width: "40vw", display: "inline-block" }}
          />
          <h5 style={{ margin: "-15px 0 10px 0" }}>or</h5>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              margin: "0 10px 10px 0",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: "white",
            }}
            onClick={handleFacebookSignIn}
          >
            <FaFacebook style={{ margin: "0 4px 3px 0" }} />
            Sign up with Facebook
          </button>
          <button
            style={{
              margin: "0 0 10px 10px",
              borderRadius: ".4rem",
              padding: "10px 20px",
              backgroundColor: "white",
            }}
            onClick={handleGoogleSignIn}
          >
            <FcGoogle style={{ margin: "0 4px 3px 0" }} />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
