import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await loginWithRedirect({
        screen_hint: 'signup',
        email,
        password,
        fname,
        lname,
      });

      // Send user data to your backend
      const response = await fetch('https://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fname, lname }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up user');
      }

      console.log('User signed up successfully');
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label>First Name:</label>
        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;