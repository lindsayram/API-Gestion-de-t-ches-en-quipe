//token, infos des users
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '30d'

//Generate token
const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

//@desc     Register a new user
//@route    POST/api/v1/auth/register
//@access   Public
//Fonction  register
const register = async (req, res) =>{
    try {
        const {name, email, password, role} = req.body

        //Si les champs sont vides, alors message erreur
        if(!name || !email || !password){
            return res.status(400).json({ message : 'Please provide name, email and password'})
        }

        //Verify if email already exist
        const exisitingUser = await User.findOne({email})
        if(exisitingUser){
            return res.status(400).json({ message: 'Email invalid'})
        }

        const user = await User.create({
            name, 
            email,
            password,
            role: role || 'user'
        })

        const token = generateToken(user._id)

        res.status(201).json({ 
            message : 'You are registered',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message})
    }
}


//@desc     Login an user
//@route    POST/api/v1/auth/login
//@access   Public
//Fonction  login
const login = async (req, res)=> {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({ message : 'Please provide email and password'})
        }

        //Verify if email exisits
        const user =  await User.findOne({email}).select('+password')

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        //Check password
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: ' Login successfully',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server error during login", error: err.message})
    }
}
module.exports = { register, login }