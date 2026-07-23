//un modèle avec un titre et une desc à insérer
//insérer le type (string)
const mongoose =  require('mongoose')

const projectSchema = new mongoose.Schema (
    {
        title:{
            type: String,
            required:[true,'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        creator:{
            type: String,
        },
        collaborator:{
            type: Array,
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Project', projectSchema)