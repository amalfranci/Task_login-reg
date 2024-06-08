import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Register() {

  const navigator =useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setError] = useState('')
    const [message, setMessage] = useState('')
    axios.defaults.withCredentials=true
    
    const handleSubmit = (e) => {
        
        e.preventDefault()

        axios.post('http://localhost:3001/auth/register', { username, email, password })
            .then(res => {
                console.log(res)
                if (res.data.status)
                {
                    navigator('/login')
                    
                }
                else {
                    navigator('/register')
                }
            
        }).catch(err => {
        
            console.log(err)
            navigator('/register')
        })
    }



  return (
      <div className='form-container'>
          <form className='form-main' onSubmit={handleSubmit}>
              
              <p>Register Page</p>

              <label htmlFor='username'>Username: </label>
              <input
                  type='text'
                  value={username}
                  placeholder='Username'
              onChange={(e)=>setUsername(e.target.value)}
              />


              <label htmlFor='email'>Email: </label>
              <input
                  type='email'
                  value={email}
                  placeholder='Email'
              onChange={(e)=>setEmail(e.target.value)}
              />


              <label htmlFor='password'>Password: </label>
              <input
                  type='password'
                  value={password}
                  placeholder='Password'
              onChange={(e)=>setPassword(e.target.value)}
              />

              <button type='submit'>REGISTER</button>

              <p>Already have Acoount</p><Link to='/login'>Login</Link>
              


          </form>

          
           



    </div>
  )
}

export default Register