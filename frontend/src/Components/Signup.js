import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from '../utils/api';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
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

    const normalizedEmail = formData.email.trim().toLowerCase();
    if (!normalizedEmail.endsWith('@nitjsr.ac.in')) {
      const message = 'Only @nitjsr.ac.in email addresses are allowed';
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      const message = 'Password must be at least 8 characters long';
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl('/user/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: normalizedEmail,
          password: formData.password,
        }),
      });

      let message = 'Signup failed';
      try {
        const text = await response.text();
        try {
          const parsed = JSON.parse(text);
          message = parsed?.message || text;
        } catch {
          message = text;
        }
      } catch (e) {
        message = 'Signup failed';
      }

      if (!response.ok) {
        setError(message || 'Email already exists');
        toast.error(message || 'Email already exists');
        return;
      }

      toast.success('Account created successfully. Please log in.');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Unable to sign up right now. Please try again.');
      toast.error('Unable to sign up right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen dark:bg-black">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl dark:bg-gray-800">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-[#3d1689] dark:text-white">Create account</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Use your NIT JSR email to register.</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">First Name</span>
              </label>
              <input name="firstName" type="text" placeholder="First name" className="input input-bordered" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Last Name</span>
              </label>
              <input name="lastName" type="text" placeholder="Last name" className="input input-bordered" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input name="email" type="email" placeholder="name@nitjsr.ac.in" className="input input-bordered" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input name="password" type="password" placeholder="Password" className="input input-bordered" value={formData.password} onChange={handleChange} required minLength={8} />
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Signup'}
              </button>
            </div>

            <p className="text-sm text-center mt-4 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/" className="text-[#3d1689] font-semibold hover:underline dark:text-white">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;