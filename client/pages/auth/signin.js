import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import dynamic from 'next/dynamic';

const DynamicLoginPage = dynamic(() => import('./signin'), {
  loading: () => {
    <p>Loading...</p>;
  },
});
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email: email, password: password },
    onSuccess: () => Router.push('/'),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: '25rem' }}>
          <h3 className="text-center mb-4">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email-Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="********"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {errors && <div>{errors}</div>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
