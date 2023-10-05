/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of your user
 *         password:
 *           type: string
 *           description: password for the user    
 *     
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /login:
 *   post:
 *     summary: login the user 
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: success login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

const { Router } = require('express')
const router = Router()

const {
    login,
    register
} = require("../controllers/userControllers")

router.post('/register', register)
router.post('/login', login)


module.exports = router