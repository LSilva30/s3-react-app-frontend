import React, { useEffect, useState } from 'react'

export default function Signup() {
  const [user, setUser] = useState({})
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(rawData => rawData.json())
      .then(allUsers => setAllUsers(allUsers))
      .catch(err => console.log(err))
  }, [])

  const handleUserPost = () => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(rawData => rawData.json())
      .then(data => localStorage.setItem('user', JSON.stringify(data)))
      .then(() => window.location.reload(false))
      .catch(err => console.log(err))
  }

  const handleUserForm = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h2>Sign up here</h2>
      <input
        type='text'
        name='fname'
        placeholder='First name'
        onChange={handleUserForm}
      />
      <input
        type='text'
        name='lname'
        placeholder='Last name'
        onChange={handleUserForm}
      />
      <input
        type='email'
        name='email'
        placeholder='Your email here'
        onChange={handleUserForm}
      />
      <input
        type='password'
        name='password'
        placeholder='your Password here'
        onChange={handleUserForm}
      />
      <button
        type='submit'
        disabled={
          user.email && user.password && user.lname && user.fname ? false : true
        }
        onClick={handleUserPost}
      >
        Sign me up!
      </button>
      {allUsers &&
        allUsers.map(eachUser => {
          return (
            <div key={eachUser._id}>
              <span> {eachUser.fname}</span>
              <span> {eachUser.lname}</span>
              <span> {eachUser.email}</span>
              <hr />
            </div>
          )
        })}
        <button onClick={() => localStorage.clear()}> Clear local storage </button>
        <button onClick={() => {
          const localUser = localStorage.getItem('user')
          console.log(JSON.parse(localUser))
          }}
        > 
      Get local storage
       </button>
    </>
  )
}
