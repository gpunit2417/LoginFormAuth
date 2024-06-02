import React from "react";

export default function SignUp() {
  return (
    <div
      className="card"
      style={{
        width: "70vw",
        display: "inline-block",
        margin: "20px auto",
        backgroundColor: "#65CCB8",
      }}
    >
      <div
        style={{
          width: "70%",
          backgroundColor: "white",
          margin: "10px 0 10px 30px",
          borderRadius: "1rem",
        }}
      >
        <h1>Sign up</h1>
        <h4 style={{ textAlign: "left", margin: "30px " }}>Create Account</h4>
        <div>
          <label style={{margin: '0 10px 15px 10px'}}>First Name</label>
          <input
            type="text"
            style={{ borderRadius: ".5rem", margin: "0 20px 0 2px" }}
          />
          <label style={{margin: '0 10px 15px 10px'}}>Last Name</label>
          <input type="text" style={{ borderRadius: ".5rem", margin: "0 0 0 2px" }} />
        </div>
        <div>
          <label style={{margin: '0 10px 15px 10px'}}>Email</label>
          <input type="email" style={{ borderRadius: ".5rem" }} />
        </div>
        <div>
          <label style={{margin: '0 10px 15px 10px'}}>Password</label>
          <input type="password" style={{ borderRadius: ".5rem" }} />
        </div>
        <div>
          <label style={{margin: '0 10px 15px 10px'}}>Confirm Password</label>
          <input type="cpassword" style={{ borderRadius: ".5rem" }} />
        </div>
        <button style={{margin: '0 10px 15px 10px'}}>Create Account</button>
        <div>
          <p>
            Already have an account?
            <a href="/login">Login</a>
          </p>
        </div>
        <div style={{ display: "inline-block" }}>
          <hr style={{ color: "black", width: "40vw" }} />
          <h5 style={{margin: '0 0 10px 0'}}>or</h5>
        </div>
        <div>
          <button style={{ margin: "0 10px 10px 0", borderRadius: ".4rem" }}>
            Sign up with Facebook
          </button>
          <button style={{ margin: "0 0 10px 10px", borderRadius: "0.4rem" }}>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
