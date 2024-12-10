import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the image
import techImage from '../assets/tech.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const correctUsername = 'admin';
  const correctPassword = 'password';

  const handleLogin = async ( ) => {
  
    setErrorMessage(''); // Clear any previous error messages

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
    } else if (username === correctUsername && password !== correctPassword) {
      setErrorMessage('Incorrect password. Please try again.');
    } else if (username !== correctUsername) {
      setErrorMessage('Invalid username. Please try again.');
    } else {
      // Successful login
      navigate('/dashboard'); // Navigate to dashboard on success
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center md:justify-start px-4"
      style={{ backgroundImage: `url(${techImage})` }}
    >
      {/* Login Form Container */}
      <div className="bg-[#042c2c] bg-opacity-80 p-6 md:p-8 text-white rounded-lg w-full max-w-md md:ml-12">
        <h2 className="text-2xl md:text-3xl mb-4">Welcome</h2>
        <p className="text-sm mb-8">Please login to Admin Dashboard.</p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error message */}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          <a href="#" className="text-gray-400 hover:underline">
            Forgotten Your Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
