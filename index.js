const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const cors = require('cors')
require('dotenv').config()
const setupDB = require('./utils/db');

const app = express()
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
setupDB()

app.use('/api/mebel', require('./routes/mebelRoutes'))
app.use('/api/user', require('./routes/userRoutes'))


const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Mebel api doc",
            version: "0.1"
        },
        servers:[
            {
                url:"https://mebel-j1jg.onrender.com/api/"
            },
            {
                url:"http://localhost:5000/api/"
            },
        ]
    },
    apis: ["./routes/*.js"],
}

const spacs = swaggerjsdoc(options)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(spacs))
// const PORT = process.env.PORT || 5000
app.listen()