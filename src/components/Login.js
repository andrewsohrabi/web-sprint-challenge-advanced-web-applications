import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const initialFormValues = { 
  username: 'Lambda School', 
  password: 'i<3Lambd4' 
}

const Login = () => {

  const [credentials, setCredentials] = useState(initialFormValues);
  const [error, setError] = useState('')
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === '' || credentials.password === '') {
      setError('Username or Password not valid');
    } else {
      axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log('res.data.payload from login',res.data.payload);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/bubble-page');
      })
      .catch(err => {
        console.log(err);
        setError(err.response.data.error);
      })
    }
  };
  


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
      </h1>

      <form onSubmit={handleSubmit}>
          <h2>Login:</h2>
          <input
          name='username'
          type='text'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChange}/>

          <input
          name='password'
          type='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleChange}/>

          <button>Login</button>
          <div className='error'>{error}</div>
        </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displayed, display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.