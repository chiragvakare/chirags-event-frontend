import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      password: '',
    };

    if (!formData.username) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('chirags-event-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      if (response.ok) {
        if (data && data.jwt) {
          // Store the JWT token in local storage
          localStorage.setItem('token', data.jwt);
          // Store the Username in local storage
          localStorage.setItem('username', formData.username);
          // Optionally, redirect to a protected route
          toast.success("Login successful");
          
          setInterval(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          toast.error('Login successful, but no token received.');
          console.error('No token received:', data);
        }
      } else {
        const errorMessage = data ? data.message : 'Login failed!';
        toast.error(errorMessage);
        console.error('Login failed:', data);
      }
    } catch (error) {
      toast.error('An error occurred while logging in.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <section className="mb-5">
      <div className="container-fluid h-custom">
        <ToastContainer />
        <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="login.jpg"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
