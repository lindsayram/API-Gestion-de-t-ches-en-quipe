const jwt = require('jsonwebtoken')
const Project = require('../models/projectModel')
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
            creator: req.user.id
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

        const collaborator = req.body.collaborator
        
        if(collaborator != null){
            project.collaborator.push(collaborator)
        }

        const exisitingCollaborator = await Project.findOne({collaborator})
        if(exisitingCollaborator){
            return res.status(400).json({ message: 'This collaborator already participate'})
        }
        
        const updateProject = await project.save()
        res.json(updateProject)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

//Consulter les projets auquels je participe

module.exports = {registerProject, updateProject}