const User = require('../models/userModel')


const profile = async (req, res) => {
    try {
        res.status(200).json({user: req.user})
    } catch (err) {
        res.status(500).json({message: 'Servor error fetching user profile', error: err.message})
    }
}


// exports.getUserByID = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         if(user == null){
//             return res.status(404).json({ message: 'User not found'})
//         }
//         res.json(user)
//     } catch (err) {
//         res.status(500).json({ message: err.message})
//     }
// }

module.exports = {profile}