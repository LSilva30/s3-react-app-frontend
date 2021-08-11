import React, { useState } from 'react'

export default function Login() {
  const [user, setUser] = useState({})
  const [status, setStatus] = useState('login')

  const handleUserForm = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleUserLogin = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        res.ok
          ? setStatus('User logged in now')
          : setStatus('authentication failed')
      )
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2>Log in form</h2>
      <input type='email' name='email' placeholder="Enter email here" onChange={handleUserForm} />
      <input type='password' name='password' placeholder="Enter password here" onChange={handleUserForm} />
      <button
        type='submit'
        onClick={handleUserLogin}
        disabled={user.email && user.password ? false : true}
      >
        Log In
      </button>
      <small>{status}</small>
    </>
  )
}
