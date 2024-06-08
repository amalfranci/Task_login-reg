import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router()
import { User } from '../model/Usermodel.js'


router.post('/register', async (req, res) => {
    
    const { username, email, password } = req.body
    
    try {

        const user = await User.findOne({ email })
        if (user)
        {
            return res.json({message:"user already registerd"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        
        const newUser = new User({
            
            username,
            email,
            password:hashPassword
        })

        await  newUser.save()

        return res.status(201).json({status:true,message:"User Registeration Sucessfull"})
        

    }
    catch (err)
    {
        console.log(err)
        return res.status(500).json({message:"Registeration failed"})
    }
})



// for user login

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })
        if (!user)
        {
            return res.json({message:"User not found"})
        }
        
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword)
        {
            return res.status(401).json({message:"User Password Incorrect"})
        }
        
        const token =  jwt.sign({ username: user.username }, "jwttokenkey", { expiresIn: '1h' })

    
        
      res.cookie("access_token", token, {  maxAge:360000 });
       console.log('Cookie set: ', res.getHeader('Set-Cookie'));

           return res.status(200).json({ status: true,message: "user Login sucessfully",token:token})
    }
    catch (err) {
        
        console.log(err)
        return res.status(500).json({message:"Login Faild"})
    }
})

// auth check

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(403).json({ message: "User not authorized" })
    }
    try {
        const decoded = jwt.verify(token, "jwttokenkey")
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid" })
    }
}


router.get('/verifying', verifyToken, (req, res) => {
    
    return res.json({ status: true, message:"user is authenticated"})
})


router.post('/logout', (req, res) => {
    res.clearCookie("access_token")
    return res.json({ status: true, message: "User logged out successfully" })
})


export { router as UserRouter}