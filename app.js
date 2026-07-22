const express = require('express')
const app = express()
const port = 3001
//Utilisation des variables sur .env
require('dotenv').config()
//Connexion à MongoDB
require('./config/db')

//Import des routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)

//       URL
app.get('/', (req, res) =>{
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () =>{
    // Ce console log s'affiche uniquement côté SERVEUR et non CLIENT
    console.log(`Serveur démarré sur http://localhost:${port}`)
})