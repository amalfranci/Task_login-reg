import React, { useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom'

function Home() {


    const navigate = useNavigate()
    axios.defaults.withCredentials=true


  useEffect(() => {
        axios.get('http://localhost:3001/auth/verifying', { withCredentials: true })
            .then(res => {
                console.log(res)
                if (!res.data.status) {
                    navigate('/login')
                }
            }).catch(err => {
                console.log(err)
                navigate('/login')
            })
    }, [navigate])



     const handlelogout = () => {
        axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/login')
            }).catch(err => {
                console.log(err)
            })
    }

  return (
      <div>Home
          
      <button onClick={handlelogout}>logout</button>

    </div>
  )
}

export default Home