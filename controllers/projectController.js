//Ici on dit qu'on crée le projet
//Insère des contrôles
//On doit être connecté pour pouvoir créer un projet

const jwt = require('jsonwebtoken')
const Project = require('../models/projectModel')

// const JWT_SECRET = process.env.JWT_SECRET

//Create a project US3
const registerProject = async (req, res) => {
    try {
        const { title, description} = req.body

        //Champs non vides
        if(!title || !description){
            return res.status(400).json({message: 'Please provide title and description'})
        }

        //Verify if user is connected --> add authmiddleware

        const project = await Project.create({
            title,
            description,
        })

        res.status(201).json({
            message : 'New project created',
            project:{
                id: project.id,
                title: project.title,
                description: project.description,
            }
            
        })
    } catch (err) {
        res.status(500).json({message : 'Servor error during registration'})
    }   
}

module.exports = {registerProject}