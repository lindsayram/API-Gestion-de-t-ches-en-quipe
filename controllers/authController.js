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

        const token = generateToken(user.id)

        res.status(201).json({ 
            message : 'You are registered',
            token,
            user: {
                id: user.id,
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

module.exports = {register}