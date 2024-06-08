import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Login() {


    const navigator =useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setError] = useState('')
    const [message, setMessage] = useState('')
    
    const handleSubmit = (e) => {
        
        e.preventDefault()

        axios.post('http://localhost:3001/auth/login', {  email, password })
            .then(res => {
                console.log(res)
                if (res.data.status)
                {

                    navigator('/')
                    
                }
                else {
                    navigator('/login')
                }
            
        }).catch(err => {
        
            console.log(err)
            navigator('/login')
        })
    }



  return (
      <div className='form-container'>
          <form className='form-main' onSubmit={handleSubmit}>
              
              <p>Register Page</p>

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

              <button type='submit'>Login</button>

              <p>New User</p><Link to='/register'>Register</Link>
              


          </form>

          
           



    </div>
  )
}

export default Login