import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(apiUrl('/user/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = typeof data === 'string' ? data : data?.message || 'Invalid email or password';
        setError(message);
        toast.error(message);
        return;
      }

      const userData = {
        email: data.user.email,
        name: data.user.firstName,
        token: data.token,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      onLogin(userData);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to log in right now. Please try again.');
      toast.error('Unable to log in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4 dark:bg-black">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white dark:bg-gray-800">
            <form className="space-y-8 dark:bg-gray-800" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-[#3d1689] text-3xl font-extrabold dark:text-white">Welcome!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Login with your institute email and password.</p>
              </div>

              <div>
                <label className="text-gray-800 text-[15px] mb-2 block dark:text-white">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm text-gray-800 bg-gray-200 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600 dark:bg-gray-900 dark:text-white"
                    placeholder="name@nitjsr.ac.in"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-gray-800 text-[15px] mb-2 block dark:text-white">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-sm text-gray-800 bg-gray-200 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600 dark:bg-gray-900 dark:text-white"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-sm tracking-wide rounded-md text-white bg-[#3d1689] focus:outline-none disabled:opacity-70"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                New user?{' '}
                <Link to="/signup" className="text-[#3d1689] font-semibold hover:underline dark:text-white">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center max-md:mt-8">
            <div className="w-72 md:w-80 lg:w-96">
              <img
                src="/jolt_logo.png"
                className="w-full h-auto object-contain rounded-2xl shadow-md"
                alt="logo_2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
