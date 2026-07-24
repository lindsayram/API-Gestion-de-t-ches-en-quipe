const jwt = require('jsonwebtoken')
const Project = require('../models/projectModel')
const User = require('../models/userModel')
// const JWT_SECRET = process.env.JWT_SECRET

//Create a project US3
const registerProject = async (req, res) => {
    try {
        const { title, description, creator} = req.body

        //Champs non vides
        if(!title || !description){
            return res.status(400).json({message: 'Please provide title and description'})
        }

        const project = await Project.create({
            title,
            description,
            creator: req.user._id
        })
        
        res.status(201).json({
            message : 'New project created',
            project:{
                id: project.id,
                title: project.title,
                description: project.description,
                creator: req.user.id
            }    
        })
        
    } catch (err) {
        res.status(500).json({message : 'Servor error during registration'})
    }   
}

//Ajouter des collaborateurs US4
const updateProject = async (req, res) => {
    try {
        //Project is existed?
        const project = await Project.findById(req.params.id)
        if(project == null) {
            return res.status(404).json({ message: 'Project is not found'})
        }

        const email = req.body.email

        // Champ ne doit pas être vide
        if(email == null) {
            return res.status(400).json({ message : 'Please provide a collaborator'})
        }

        // Vérifier dans le projet si le collaborateur est déjà present
        if(project.collaborator.includes(email)){
            return res.status(400).json({ message: 'This collaborator already exists'})
        }

        project.collaborator.push(email)  //save id
        const newProject = await project.save()
        res.json(newProject)
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

//Consulter les projets auquels je participe (membre et créateur) US5
const getMyProject = async (req, res) =>{
    try {
        const projects = await Project.find({
            $or: [ 
                {creator: req.user._id},
                {collaborator: req.user.email}
            ]
        })
        res.status(200).json(projects)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {registerProject, updateProject, getMyProject}