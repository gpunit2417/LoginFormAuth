import React from "react";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <pre style={{margin: '40px 0', fontSize: '2rem', fontWeight: '700'}}>Just a login and a signup form</pre>
      <p style={{fontSize: '2rem'}}>Click on the Login and Signup button on the Navbar.</p>
      <p style={{fontSize: '1.5rem'}}>If you have not signed up, first signup please. Otherwise you won't be able to login to your account</p>
      <p style={{fontSize: '1.5rem'}}>If you have already signed up, then proceed with the login button.</p>
    </div>
  );
}
