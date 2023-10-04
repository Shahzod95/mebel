const { Router } = require('express')
const router = Router()

const {
    login,
    getUser
} = require("../controllers/userControllers")

router.post('/login', login)


module.exports = router