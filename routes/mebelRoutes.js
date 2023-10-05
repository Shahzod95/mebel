/**
 * @swagger
 * components:
 *   schemas:
 *     Mebel:
 *       type: object
 *       required:
 *         - title
 *         - old
 *         - new
 *         - type
 *         - mebel
 *         - sale
 *         - img_list
 *         - img 
 *         - size
 *         - name
 *         - subtitle
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the mabel
 *         title:
 *           type: string
 *           description: The title of your mabel
 *         old:
 *           type: number
 *           description: The old of your mabel
 *         new:
 *           type: number
 *           description: The title of your mabel  
 *         type:
 *           type: string
 *           description: The type image of your mabel 
 *         mebel:
 *           type: string
 *           description: The mabel
 *         sale:
 *           type: string
 *           description: The mabel sale
 *         img_list:
 *           type: string
 *           description: The mabel img_list
 *         img:
 *           type: string
 *           description: The mabel img
 *         size:
 *           type: string
 *           description: The mabel size
 *         name:
 *           type: string
 *           description: The mabel name
 *         subtitle: 
 *           type: string
 *           description: The mabel subtitle   
 *         descripton:
 *           type: string
 *           description: The mabel description
 */

/**
 * @swagger
 * tags:
 *   name: Mebels
 *   description: The Mebels managing API
 * /mebel:
 *   get:
 *     summary: Lists all the mebels
 *     tags: [Mebels]
 *     responses:
 *       200:
 *         description: The list of the mebels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mebel'
 * /mebel/add:
 *   post:
 *     summary: Create a new mebel
 *     tags: [Mebels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mebel'
 *     responses:
 *       200:
 *         description: The created mebel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mebel'
 *       500:
 *         description: Some server error
 * /mebel/{id}:
 *   get:
 *     summary: Get the mebel by id
 *     tags: [Mebels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mebel id
 *     responses:
 *       200:
 *         description: The mebel response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mebel'
 *       404:
 *         description: The travel was not found
 *   put:
 *    summary: Update the mebel by the id
 *    tags: [Mebels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The mebel id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Mebel'
 *    responses:
 *      200:
 *        description: The mebel was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Mebel'
 *      404:
 *        description: The travel was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the mebel by id
 *     tags: [Mebels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mebel id
 *
 *     responses:
 *       200:
 *         description: The mebel was deleted
 *       404:
 *         description: The mebel was not found
 */


const { Router } = require('express')
const router = Router()

const {
    getMebels,
    getMebelById,
    addMebel,
    updateMebel,
    deleteMebel
} = require("../controllers/mebelControllers")

const {upload} = require("../utils/multer")

router.get('/', getMebels)
router.get('/:id', getMebelById)
router.post('/add', upload.fields([{name:"img_list", maxCount:20}, {name:"img"}]), addMebel)
router.put('/:id', upload.fields([{name:"img_list", maxCount:20}, {name:"img"}]), updateMebel)
router.delete("/:id", deleteMebel)

module.exports = router